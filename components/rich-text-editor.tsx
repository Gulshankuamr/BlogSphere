"use client"

import { useEditor, EditorContent, type Editor, BubbleMenu } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextStyle from "@tiptap/extension-text-style"
import Color from "@tiptap/extension-color"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Underline from "@tiptap/extension-underline"
import Strike from "@tiptap/extension-strike"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
// import { lowlight } from 'lowlight'; // ✅ correct in latest versions
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Quote,
  Undo,
  Redo,
  Image as ImageIcon,
  Palette,
  Trash2,
  Link as LinkIcon,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Paperclip,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect, useRef } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [linkUrl, setLinkUrl] = useState("")
  const [isLinkMenuOpen, setIsLinkMenuOpen] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        codeBlock: false,
      }),
      TextStyle,
      Color,
      Underline,
      Strike,
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-md border',
        },
      }),
      // CodeBlockLowlight.configure({
      //   lowlight,
      // }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert focus:outline-none min-h-[150px] p-4",
      },
      handlePaste: (view, event) => {
        const items = event.clipboardData?.items
        if (!items) return false

        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          if (item.type.indexOf('image') === 0) {
            event.preventDefault()
            const file = item.getAsFile()
            if (file) {
              const reader = new FileReader()
              reader.onload = (readerEvent) => {
                const imageUrl = readerEvent.target?.result as string
                editor?.chain().focus().setImage({ src: imageUrl }).run()
              }
              reader.readAsDataURL(file)
            }
            return true
          }
        }
        return false
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editor) return

    if (!file.type.match('image.*')) {
      toast.error('Please select an image file')
      return
    }

    const reader = new FileReader()
    reader.onload = (readerEvent) => {
      const imageUrl = readerEvent.target?.result as string
      editor.chain().focus().setImage({ src: imageUrl }).run()
    }
    reader.readAsDataURL(file)
  }

  const handleDeleteImage = () => {
    if (editor && editor.isActive('image')) {
      editor.chain().focus().deleteSelection().run()
    }
  }

  const setLink = () => {
    if (linkUrl === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor?.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run()
    setIsLinkMenuOpen(false)
    setLinkUrl('')
  }

  if (!isMounted) {
    return <div className={cn("border rounded-md px-3 py-2 min-h-[150px]", className)}>Loading editor...</div>
  }

  return (
    <div className={cn("border rounded-md", className)}>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex bg-white dark:bg-gray-900 shadow-lg border rounded-md p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'bg-gray-100 dark:bg-gray-800' : ''}
            >
            
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'bg-gray-100 dark:bg-gray-800' : ''}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive('underline') ? 'bg-gray-100 dark:bg-gray-800' : ''}
            >
              <UnderlineIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? 'bg-gray-100 dark:bg-gray-800' : ''}
            >
              <Strikethrough className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleLink({ href: linkUrl }).run()}
              className={editor.isActive('link') ? 'bg-gray-100 dark:bg-gray-800' : ''}
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
          </div>
        </BubbleMenu>
      )}

      <MenuBar 
        editor={editor} 
        onImageUploadClick={() => fileInputRef.current?.click()}
        onDeleteImage={handleDeleteImage}
        linkUrl={linkUrl}
        setLinkUrl={setLinkUrl}
        isLinkMenuOpen={isLinkMenuOpen}
        setIsLinkMenuOpen={setIsLinkMenuOpen}
        setLink={setLink}
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
      <div className="min-h-[150px]">
        <EditorContent editor={editor} placeholder={placeholder} />
      </div>
    </div>
  )
}

interface MenuBarProps {
  editor: Editor | null
  onImageUploadClick: () => void
  onDeleteImage: () => void
  linkUrl: string
  setLinkUrl: (url: string) => void
  isLinkMenuOpen: boolean
  setIsLinkMenuOpen: (open: boolean) => void
  setLink: () => void
}

function MenuBar({ 
  editor, 
  onImageUploadClick, 
  onDeleteImage,
  linkUrl,
  setLinkUrl,
  isLinkMenuOpen,
  setIsLinkMenuOpen,
  setLink,
}: MenuBarProps) {
  const [color, setColor] = useState("#000000")

  if (!editor) {
    return null
  }

  const applyTextColor = () => {
    editor.chain().focus().setColor(color).run()
  }

  const resetTextColor = () => {
    editor.chain().focus().unsetColor().run()
  }

  return (
    <div className="flex flex-wrap items-center gap-1 border-b p-2">
      {/* Text Formatting */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn(editor.isActive("bold") ? "bg-muted" : "")}
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cn(editor.isActive("italic") ? "bg-muted" : "")}
        title="Italic"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={cn(editor.isActive("underline") ? "bg-muted" : "")}
        title="Underline"
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={cn(editor.isActive("strike") ? "bg-muted" : "")}
        title="Strikethrough"
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      
      {/* Color Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" title="Text Color">
            <Palette className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-10 p-1"
              />
              <Input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={applyTextColor}>
                Apply
              </Button>
              <Button size="sm" variant="outline" onClick={resetTextColor}>
                Reset
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <div className="h-4 w-px bg-border mx-1" />
      
      {/* Headings */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cn(editor.isActive("heading", { level: 1 }) ? "bg-muted" : "")}
        title="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn(editor.isActive("heading", { level: 2 }) ? "bg-muted" : "")}
        title="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={cn(editor.isActive("heading", { level: 3 }) ? "bg-muted" : "")}
        title="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={cn(editor.isActive("heading", { level: 4 }) ? "bg-muted" : "")}
        title="Heading 4"
      >
        <Heading4 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={cn(editor.isActive("heading", { level: 5 }) ? "bg-muted" : "")}
        title="Heading 5"
      >
        <Heading5 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={cn(editor.isActive("heading", { level: 6 }) ? "bg-muted" : "")}
        title="Heading 6"
      >
        <Heading6 className="h-4 w-4" />
      </Button>
      
      <div className="h-4 w-px bg-border mx-1" />
      
      {/* Lists */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(editor.isActive("bulletList") ? "bg-muted" : "")}
        title="Bullet List"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(editor.isActive("orderedList") ? "bg-muted" : "")}
        title="Ordered List"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cn(editor.isActive("blockquote") ? "bg-muted" : "")}
        title="Quote"
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={cn(editor.isActive("codeBlock") ? "bg-muted" : "")}
        title="Code Block"
      >
        <Code className="h-4 w-4" />
      </Button>
      
      <div className="h-4 w-px bg-border mx-1" />
      
      {/* Link Controls */}
      <Popover open={isLinkMenuOpen} onOpenChange={setIsLinkMenuOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLinkMenuOpen(true)}
            className={cn(editor.isActive('link') ? 'bg-muted' : '')}
            title="Link"
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Insert Link</h4>
              <p className="text-sm text-muted-foreground">
                Paste or type a URL
              </p>
            </div>
            <div className="flex gap-2">
              <Input
                id="link-url"
                placeholder="https://example.com"
                className="h-8 flex-1"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
              <Button size="sm" onClick={setLink}>
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      {/* Image Controls */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onImageUploadClick}
        title="Insert Image"
      >
        <ImageIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onDeleteImage}
        disabled={!editor.isActive('image')}
        title="Delete Image"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      
      <div className="h-4 w-px bg-border mx-1" />
      
      {/* Undo/Redo */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo"
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo"
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  )
}
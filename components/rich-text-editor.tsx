"use client"

import { useEditor, EditorContent, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
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
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert focus:outline-none min-h-[150px]",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle the case where the editor is not yet initialized
  if (!isMounted) {
    return <div className={cn("border rounded-md px-3 py-2 min-h-[150px]", className)}>Loading editor...</div>
  }

  return (
    <div className={cn("border rounded-md", className)}>
      <MenuBar editor={editor} />
      <div className="px-3 py-2">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

interface MenuBarProps {
  editor: Editor | null
}

function MenuBar({ editor }: MenuBarProps) {
  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-1 border-b p-2">
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
      <div className="h-4 w-px bg-border mx-1" />
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
      <div className="h-4 w-px bg-border mx-1" />
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

import React, { useRef, useEffect, useState } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  className?: string;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, className, placeholder }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState({
    bold: false,
    italic: false,
    underline: false,
    ul: false,
    ol: false,
    link: false,
    alignLeft: false,
    alignCenter: false,
    alignRight: false,
    alignJustify: false,
  });

  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.innerHTML !== value) ref.current.innerHTML = value || '';
  }, [value]);

  const exec = (command: string, valueArg?: string) => {
    document.execCommand(command, false, valueArg);
    // push updated html
    if (ref.current) onChange(stripColorStyles(ref.current.innerHTML));
    // update active state after exec
    updateActiveStates();
  };

  const handleInput = () => {
    if (!ref.current) return;
    onChange(stripColorStyles(ref.current.innerHTML));
  };

  // Remove inline color styles and <font color=...> tags to allow theme-controlled text color
  const stripColorStyles = (html: string) => {
    try {
      const tmp = document.createElement('div');
      tmp.innerHTML = html || '';
      // remove color declarations from style attributes
      tmp.querySelectorAll('[style]').forEach((el) => {
        try {
          (el as HTMLElement).style.removeProperty('color');
        } catch (e) {}
      });
      // unwrap <font> tags (legacy) and remove color attr
      tmp.querySelectorAll('font').forEach((f) => {
        const parent = f.parentNode;
        if (!parent) return;
        while (f.firstChild) parent.insertBefore(f.firstChild, f);
        parent.removeChild(f);
      });
      // remove color attributes on any elements
      tmp.querySelectorAll('[color]').forEach((el) => {
        try { (el as HTMLElement).removeAttribute('color'); } catch (e) {}
      });
      return tmp.innerHTML;
    } catch (e) {
      return html;
    }
  };

  const makeLink = () => {
    const url = window.prompt('Enter URL (https://...)');
    if (url) exec('createLink', url);
  };

  const updateActiveStates = () => {
    try {
      const sel = document.getSelection();
      const anchorNode = sel?.anchorNode as Node | null;

      const inLink = (() => {
        let node = anchorNode as Node | null;
        while (node) {
          if ((node as HTMLElement).nodeName?.toLowerCase() === 'a') return true;
          node = node.parentNode;
        }
        return false;
      })();

      setActive({
        bold: !!document.queryCommandState && document.queryCommandState('bold'),
        italic: !!document.queryCommandState && document.queryCommandState('italic'),
        underline: !!document.queryCommandState && document.queryCommandState('underline'),
        ul: !!document.queryCommandState && document.queryCommandState('insertUnorderedList'),
        ol: !!document.queryCommandState && document.queryCommandState('insertOrderedList'),
        link: inLink,
        alignLeft: !!document.queryCommandState && document.queryCommandState('justifyLeft'),
        alignCenter: !!document.queryCommandState && document.queryCommandState('justifyCenter'),
        alignRight: !!document.queryCommandState && document.queryCommandState('justifyRight'),
        alignJustify: !!document.queryCommandState && document.queryCommandState('justifyFull'),
      });
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    document.addEventListener('selectionchange', updateActiveStates);
    document.addEventListener('mouseup', updateActiveStates);
    document.addEventListener('keyup', updateActiveStates);
    return () => {
      document.removeEventListener('selectionchange', updateActiveStates);
      document.removeEventListener('mouseup', updateActiveStates);
      document.removeEventListener('keyup', updateActiveStates);
    };
  }, []);

  const btn = (isActive: boolean) => isActive ? 'px-2 py-1 rounded bg-violet-600 text-white' : 'px-2 py-1 rounded border bg-transparent';

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-2">
        <button type="button" title="Bold" onClick={() => exec('bold')} className={btn(active.bold)}>
          <Bold className="w-4 h-4" />
        </button>
        <button type="button" title="Italic" onClick={() => exec('italic')} className={btn(active.italic)}>
          <Italic className="w-4 h-4" />
        </button>
        <button type="button" title="Underline" onClick={() => exec('underline')} className={btn(active.underline)}>
          <Underline className="w-4 h-4" />
        </button>

        <div className="h-5 w-px bg-border mx-1" />

        <button type="button" title="Bulleted list" onClick={() => exec('insertUnorderedList')} className={btn(active.ul)}>
          <List className="w-4 h-4" />
        </button>
        <button type="button" title="Numbered list" onClick={() => exec('insertOrderedList')} className={btn(active.ol)}>
          <ListOrdered className="w-4 h-4" />
        </button>

        <div className="h-5 w-px bg-border mx-1" />

        <button type="button" title="Insert link" onClick={makeLink} className={btn(active.link)}>
          <LinkIcon className="w-4 h-4" />
        </button>

        <div className="h-5 w-px bg-border mx-1" />

        <button type="button" title="Align left" onClick={() => exec('justifyLeft')} className={btn(active.alignLeft)}>
          <AlignLeft className="w-4 h-4" />
        </button>
        <button type="button" title="Align center" onClick={() => exec('justifyCenter')} className={btn(active.alignCenter)}>
          <AlignCenter className="w-4 h-4" />
        </button>
        <button type="button" title="Align right" onClick={() => exec('justifyRight')} className={btn(active.alignRight)}>
          <AlignRight className="w-4 h-4" />
        </button>
        <button type="button" title="Justify" onClick={() => exec('justifyFull')} className={btn(active.alignJustify)}>
          <AlignJustify className="w-4 h-4" />
        </button>
      </div>

      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        className="min-h-[80px] p-2 border rounded editor-input bg-transparent"
        data-placeholder={placeholder}
        style={{ outline: 'none' }}
      />
    </div>
  );
};

export default RichTextEditor;

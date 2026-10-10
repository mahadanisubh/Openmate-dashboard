export function widgetBase() {
  return (process.env.OPENMATE_WIDGET_BASE ?? process.env.OPENMATE_API_BASE ?? 'http://localhost:8080').replace(/\/+$/, '');
}

function escapeAttribute(value) {
  return String(value).replace(/[&<>"]/g, (char) => {
    switch (char) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      default:
        return char;
    }
  });
}

export function buildEmbedTag(botId) {
  if (!botId) return '';
  return `<script src="${escapeAttribute(`${widgetBase()}/widget.js`)}" data-bot-id="${escapeAttribute(
    botId,
  )}" defer></script>`;
}

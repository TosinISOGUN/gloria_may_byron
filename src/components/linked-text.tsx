/** Renders a paragraph with one phrase turned into an outbound link, if the phrase is present. */
export function LinkedText({ text, phrase, href }: { text: string; phrase: string; href: string }) {
  const at = text.indexOf(phrase);
  if (at === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <a className="link-inline" href={href} target="_blank" rel="noreferrer noopener">
        {phrase}
      </a>
      {text.slice(at + phrase.length)}
    </>
  );
}

import { IconType } from "react-icons/lib";
import { LuAnchor, LuApple, LuBanana } from "react-icons/lu";

const linksExample = [
  {
    title: "Example",
    Icon: LuBanana,
    url: "#"
  },
  {
    title: "Example1",
    Icon: LuApple,
    url: "#"
  },
  {
    title: "Example2",
    Icon: LuAnchor,
    url: "#"
  },
];

interface Link {
  title: string;
  Icon: IconType;
  url?: string; // URLs são opcionais para permitir ações personalizadas
  onClick?: () => void; // Suporte para ações customizadas
}

interface MenuLinksProps {
  links?: Link[];
}

export default function MenuLinks({ links = linksExample }: MenuLinksProps) {
  return (
    <ul>
      {links.map((link, index) => {
        return (
          <li key={index}>
            {link.url ? (
              // Caso tenha uma URL, renderiza como link
              <a
                href={link.url}
                className="flex items-center gap-2 hover:bg-zinc-100 rounded-md p-2"
              >
                <link.Icon />
                <h3>{link.title}</h3>
              </a>
            ) : (
              // Caso tenha uma ação, renderiza como botão
              <button
                onClick={link.onClick}
                className="flex items-center gap-2 hover:bg-zinc-100 rounded-md p-2"
              >
                <link.Icon />
                <h3>{link.title}</h3>
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

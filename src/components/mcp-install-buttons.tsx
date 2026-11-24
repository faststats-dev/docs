import { ArrowUpRight } from "lucide-react";
import { type Logo, logos } from "@/components/mcp-client-logos";

const SERVER_NAME = "faststats";
const SERVER_URL = "https://api.faststats.dev/v0/mcp";

const json = (value: unknown) => encodeURIComponent(JSON.stringify(value));
const base64 = (value: unknown) =>
	encodeURIComponent(btoa(JSON.stringify(value)));

const vscodeLink = `https://insiders.vscode.dev/redirect/mcp/install?name=${SERVER_NAME}&config=${json(
	{ type: "http", url: SERVER_URL },
)}`;

const clients = {
	cursor: {
		name: "Cursor",
		logo: logos.cursor,
		href: `https://cursor.com/install-mcp?name=${SERVER_NAME}&config=${base64({ url: SERVER_URL })}`,
	},
	vscode: {
		name: "VS Code",
		logo: logos.vscode,
		href: vscodeLink,
	},
	"vscode-insiders": {
		name: "VS Code Insiders",
		logo: logos.vscode,
		href: `${vscodeLink}&quality=insiders`,
	},
	"visual-studio": {
		name: "Visual Studio",
		logo: logos.visualstudio,
		href: `https://aka.ms/vs/mcp-install?${json({ name: SERVER_NAME, url: SERVER_URL })}`,
	},
	kiro: {
		name: "Kiro",
		logo: logos.kiro,
		href: `https://kiro.dev/launch/mcp/add?name=${SERVER_NAME}&config=${json({ url: SERVER_URL })}`,
	},
	"lm-studio": {
		name: "LM Studio",
		logo: logos.lmstudio,
		href: `lmstudio://add_mcp?name=${SERVER_NAME}&config=${base64({ url: SERVER_URL })}`,
	},
	goose: {
		name: "Goose",
		logo: logos.goose,
		href: `goose://extension?url=${encodeURIComponent(SERVER_URL)}&type=streamable_http&id=${SERVER_NAME}&name=FastStats&description=${encodeURIComponent(
			"Analytics, errors, and session replays from FastStats",
		)}`,
	},
	qoder: {
		name: "Qoder",
		logo: logos.qoder,
		// Qoder base64-encodes the URL-encoded JSON, unlike Cursor.
		href: `qoder://aicoding.aicoding-deeplink/mcp/add?name=${SERVER_NAME}&config=${encodeURIComponent(
			btoa(json({ url: SERVER_URL })),
		)}`,
	},
} satisfies Record<string, { name: string; logo: Logo; href: string }>;

export type McpClient = keyof typeof clients;

function ClientLogo({ logo }: { logo: Logo }) {
	return (
		<svg
			viewBox={logo.viewBox}
			aria-hidden="true"
			className="size-5 shrink-0 fill-current"
		>
			<path d={logo.d} fillRule={logo.evenOdd ? "evenodd" : undefined} />
		</svg>
	);
}

/** One-click install buttons for clients that accept an MCP install link. */
export function McpInstallButtons({
	clients: shown = Object.keys(clients) as McpClient[],
}: {
	clients?: McpClient[];
}) {
	return (
		<div className="not-prose my-4 grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-2">
			{shown.map((id) => {
				const { name, logo, href } = clients[id];
				// App links (lmstudio://, goose://, qoder://) would leave an empty tab behind.
				const external = href.startsWith("https:")
					? { target: "_blank", rel: "noreferrer" }
					: {};
				return (
					<a
						key={id}
						href={href}
						title={`Install FastStats in ${name}`}
						{...external}
						className="group bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground border-border flex items-center gap-2.5 border px-3 py-2 transition-colors"
					>
						<ClientLogo logo={logo} />
						<span className="truncate text-sm font-medium">{name}</span>
						<ArrowUpRight className="text-muted-foreground group-hover:text-foreground ml-auto size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
					</a>
				);
			})}
		</div>
	);
}

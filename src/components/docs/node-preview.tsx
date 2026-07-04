import {
	ArrowRight,
	Calculator,
	CheckIcon,
	ChevronDown,
	CircleHelp,
	Clock,
	Clock3,
	Database,
	Filter,
	Group,
	ListFilter,
	type LucideIcon,
	Sigma,
	Type,
	Waves,
	X,
} from "lucide-react";
import type { ReactNode } from "react";

// ---------------------------------------------------------------------------
// Category palette (mirrors apps/tanstack .../nodes/node-category-badge.tsx)
// ---------------------------------------------------------------------------

type NodeBadgeCategory =
	| "source"
	| "filter"
	| "aggregate"
	| "group"
	| "transform"
	| "formula"
	| "time"
	| "output";

const CATEGORY_STYLES: Record<
	NodeBadgeCategory,
	{ border: string; bg: string; icon: string; text: string }
> = {
	source: {
		border: "border-sky-500/45",
		bg: "bg-sky-500/20",
		icon: "text-sky-700 dark:text-sky-400",
		text: "text-sky-800 dark:text-sky-200/90",
	},
	filter: {
		border: "border-amber-500/45",
		bg: "bg-amber-500/20",
		icon: "text-amber-700 dark:text-amber-400",
		text: "text-amber-800 dark:text-amber-200/90",
	},
	aggregate: {
		border: "border-emerald-500/45",
		bg: "bg-emerald-500/20",
		icon: "text-emerald-700 dark:text-emerald-400",
		text: "text-emerald-800 dark:text-emerald-200/90",
	},
	group: {
		border: "border-teal-500/45",
		bg: "bg-teal-500/20",
		icon: "text-teal-700 dark:text-teal-400",
		text: "text-teal-800 dark:text-teal-200/90",
	},
	transform: {
		border: "border-violet-500/45",
		bg: "bg-violet-500/20",
		icon: "text-violet-700 dark:text-violet-400",
		text: "text-violet-800 dark:text-violet-200/90",
	},
	formula: {
		border: "border-fuchsia-500/45",
		bg: "bg-fuchsia-500/20",
		icon: "text-fuchsia-700 dark:text-fuchsia-400",
		text: "text-fuchsia-800 dark:text-fuchsia-200/90",
	},
	time: {
		border: "border-blue-500/45",
		bg: "bg-blue-500/20",
		icon: "text-blue-700 dark:text-blue-400",
		text: "text-blue-800 dark:text-blue-200/90",
	},
	output: {
		border: "border-rose-500/45",
		bg: "bg-rose-500/20",
		icon: "text-rose-700 dark:text-rose-400",
		text: "text-rose-800 dark:text-rose-200/90",
	},
};

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

function Handle({ side }: { side: "top" | "bottom" }) {
	return (
		<div
			className={`bg-muted-foreground/70 border-card absolute left-1/2 size-2 -translate-x-1/2 rounded-full border ${
				side === "top" ? "-top-1" : "-bottom-1"
			}`}
		/>
	);
}

function CategoryBadge({
	label,
	icon: Icon,
	category,
}: {
	label: string;
	icon: LucideIcon;
	category: NodeBadgeCategory;
}) {
	const styles = CATEGORY_STYLES[category];
	return (
		<div className="pointer-events-none absolute top-0 left-3 z-10 -translate-y-1/2">
			<div
				className={`flex items-center gap-1.5 border px-2 py-0.5 shadow-sm backdrop-blur-md ${styles.border} ${styles.bg}`}
			>
				<Icon className={`size-3 ${styles.icon}`} strokeWidth={2} />
				<span
					className={`font-mono text-[10px] font-medium tracking-[0.14em] uppercase ${styles.text}`}
				>
					{label}
				</span>
			</div>
		</div>
	);
}

function NodeShell({
	label,
	icon,
	category,
	handles = "both",
	children,
	width = 280,
}: {
	label: string;
	icon: LucideIcon;
	category: NodeBadgeCategory;
	handles?: "top" | "bottom" | "both";
	children: ReactNode;
	width?: number;
}) {
	return (
		<div
			className="not-prose bg-card border-border relative overflow-visible border shadow-sm"
			style={{ width }}
		>
			{(handles === "top" || handles === "both") && <Handle side="top" />}
			{(handles === "bottom" || handles === "both") && <Handle side="bottom" />}
			<CategoryBadge label={label} icon={icon} category={category} />
			<div className="pt-4">
				<div className="space-y-2 p-2">{children}</div>
			</div>
		</div>
	);
}

function FieldLabel({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-w-0 items-center gap-1.5">
			<span className="text-muted-foreground truncate text-xs">{children}</span>
			<CircleHelp
				className="text-muted-foreground/50 size-3 shrink-0"
				strokeWidth={2}
			/>
		</div>
	);
}

function Field({ label, children }: { label: string; children: ReactNode }) {
	return (
		<div className="space-y-1.5">
			<FieldLabel>{label}</FieldLabel>
			{children}
		</div>
	);
}

function FakeInput({
	value,
	placeholder,
	mono = false,
}: {
	value?: string;
	placeholder?: string;
	mono?: boolean;
}) {
	const hasValue = value !== undefined && value !== "";
	return (
		<div
			className={`border-input flex h-7 w-full items-center border bg-transparent px-2 text-xs ${
				mono ? "font-mono" : ""
			} ${hasValue ? "text-foreground" : "text-muted-foreground/60"}`}
		>
			{hasValue ? value : placeholder}
		</div>
	);
}

function FakeSelect({
	value,
	mono = false,
	icon,
}: {
	value: string;
	mono?: boolean;
	icon?: ReactNode;
}) {
	return (
		<div
			className={`border-input flex h-7 w-full items-center justify-between border bg-transparent px-2 text-xs ${
				mono ? "font-mono" : ""
			}`}
		>
			<span className="flex items-center gap-1.5 truncate">
				{icon}
				{value}
			</span>
			<ChevronDown
				className="text-muted-foreground size-3 shrink-0"
				strokeWidth={2}
			/>
		</div>
	);
}

function FakeChips({ values }: { values: readonly string[] }) {
	return (
		<div className="border-input flex min-h-7 w-full flex-wrap items-center gap-1 border bg-transparent px-1.5 py-1 text-xs">
			{values.map((v) => (
				<span
					key={v}
					className="bg-muted flex items-center gap-1 px-1.5 py-0.5 text-[11px]"
				>
					{v}
					<X className="text-muted-foreground size-2.5" strokeWidth={2.5} />
				</span>
			))}
		</div>
	);
}

function FakeCheckbox({
	label,
	checked = false,
}: {
	label: string;
	checked?: boolean;
}) {
	return (
		<div className="flex items-center gap-2 px-1 py-0.5">
			<div
				className={`flex size-3.5 shrink-0 items-center justify-center border ${
					checked
						? "border-primary bg-primary text-primary-foreground"
						: "border-input"
				}`}
			>
				{checked ? <CheckIcon className="size-2.5" strokeWidth={3} /> : null}
			</div>
			<span className="text-muted-foreground flex-1 truncate text-xs">
				{label}
			</span>
			<CircleHelp
				className="text-muted-foreground/50 size-3 shrink-0"
				strokeWidth={2}
			/>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Node previews
// ---------------------------------------------------------------------------

export function DatasourceNodePreview() {
	return (
		<NodeShell
			label="Data Source"
			icon={Database}
			category="source"
			handles="bottom"
		>
			<Field label="Adapter">
				<FakeSelect value="Events" />
			</Field>
			<Field label="Field">
				<FakeSelect value="page_view" />
			</Field>
			<FakeCheckbox label="Dedupe" />
		</NodeShell>
	);
}

export function FilterNodePreview() {
	return (
		<NodeShell label="Filter" icon={Filter} category="filter">
			<Field label="Field">
				<FakeSelect value="browser" />
			</Field>
			<Field label="Operator">
				<FakeSelect value="equals" />
			</Field>
			<Field label="Value">
				<FakeInput value="Chrome" />
			</Field>
		</NodeShell>
	);
}

export function AggregateNodePreview() {
	return (
		<NodeShell label="Aggregate" icon={Sigma} category="aggregate">
			<Field label="Function">
				<FakeSelect value="count" mono />
			</Field>
		</NodeShell>
	);
}

export function GroupNodePreview() {
	return (
		<NodeShell label="Group By" icon={Group} category="group">
			<Field label="Fields">
				<FakeChips values={["browser", "country"]} />
			</Field>
			<Field label="Multi-field mode">
				<FakeSelect value="combined" mono />
			</Field>
		</NodeShell>
	);
}

export function TimeGroupNodePreview() {
	return (
		<NodeShell label="Time Group" icon={Clock} category="time">
			<Field label="Bucket size">
				<FakeSelect value="Hour" mono />
			</Field>
			<Field label="Missing buckets">
				<FakeSelect
					value="Zero"
					mono
					icon={<Waves className="text-muted-foreground size-3" />}
				/>
			</Field>
			<Field label="Cumulative">
				<FakeCheckbox label="Running total" checked />
			</Field>
		</NodeShell>
	);
}

export function TextTransformNodePreview() {
	return (
		<NodeShell label="Transform" icon={Type} category="transform">
			<Field label="Operation">
				<FakeSelect value="lowercase" mono />
			</Field>
		</NodeShell>
	);
}

export function FormulaNodePreview() {
	return (
		<NodeShell label="Formula" icon={Calculator} category="formula">
			<Field label="Expression">
				<FakeInput value="(A + B) / C" mono />
			</Field>
			<Field label="Output name">
				<FakeInput value="ratio" mono />
			</Field>
			<Field label="Precision">
				<FakeInput value="2" mono />
			</Field>
		</NodeShell>
	);
}

export function LimitNodePreview() {
	return (
		<NodeShell label="Limit" icon={ListFilter} category="filter">
			<Field label="Max rows">
				<FakeInput value="10" />
			</Field>
			<FakeCheckbox label="Group rows over limit as Other" />
		</NodeShell>
	);
}

export function MaxAgeNodePreview() {
	return (
		<NodeShell label="Max Age" icon={Clock3} category="time">
			<Field label="Look back at most">
				<div className="flex items-center gap-2">
					<FakeInput value="24" />
					<div className="w-14 shrink-0">
						<FakeSelect value="h" mono />
					</div>
				</div>
			</Field>
		</NodeShell>
	);
}

export function MinAgeNodePreview() {
	return (
		<NodeShell label="Min Age" icon={Clock3} category="time">
			<Field label="Exclude newer than">
				<div className="flex items-center gap-2">
					<FakeInput value="1" />
					<div className="w-14 shrink-0">
						<FakeSelect value="h" mono />
					</div>
				</div>
			</Field>
		</NodeShell>
	);
}

export function ResultNodePreview() {
	return (
		<NodeShell label="Output" icon={ArrowRight} category="output" handles="top">
			<Field label="Output name">
				<FakeInput value="page_views" mono />
			</Field>
			<p className="text-muted-foreground truncate px-1 text-[10px]">
				Final query result for this chart
			</p>
		</NodeShell>
	);
}

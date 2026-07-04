import type React from "react";
import { FastStatsIcon } from "./faststats-icon";

const BG = "#09090b";
const LINE = "rgba(255, 255, 255, 0.1)";
const BORDER = "rgba(255, 255, 255, 0.1)";

const WIDTH = 1200;
const HEIGHT = 630;
const PADDING = 40;
const MIDDLE_W = WIDTH - 2 * PADDING - 2;
const MIDDLE_H = HEIGHT - 2 * PADDING - 2;

const frameGrid: React.CSSProperties = {
	display: "grid",
	width: "100%",
	height: "100%",
	boxSizing: "border-box",
	gridTemplateColumns: `${PADDING}px 1px ${MIDDLE_W}px 1px ${PADDING}px`,
	gridTemplateRows: `${PADDING}px 1px ${MIDDLE_H}px 1px ${PADDING}px`,
	backgroundColor: BG,
	color: "#fafafa",
	fontFamily: "Geist Mono, monospace",
};

const line = { backgroundColor: LINE };

const corner: React.CSSProperties = {
	width: "0.4375rem",
	height: "0.4375rem",
	boxSizing: "border-box",
	backgroundColor: BG,
	border: `1px solid ${BORDER}`,
};

export interface OgTemplateProps {
	title: string;
	description?: string;
	label?: string;
}

export function OgTemplate({ title, description, label }: OgTemplateProps) {
	return (
		<div style={frameGrid}>
			<div
				style={{
					gridColumn: 1,
					gridRow: 1,
					zIndex: 1,
					placeSelf: "end",
					...corner,
					marginRight: "-0.25rem",
					marginBottom: "-0.25rem",
				}}
			/>
			<div
				style={{
					gridColumn: 5,
					gridRow: 1,
					zIndex: 1,
					alignSelf: "end",
					justifySelf: "start",
					...corner,
					marginLeft: "-0.25rem",
					marginBottom: "-0.25rem",
				}}
			/>
			<div
				style={{
					gridColumn: 1,
					gridRow: 5,
					zIndex: 1,
					alignSelf: "start",
					justifySelf: "end",
					...corner,
					marginTop: "-0.25rem",
					marginRight: "-0.25rem",
				}}
			/>
			<div
				style={{
					gridColumn: 5,
					gridRow: 5,
					zIndex: 1,
					placeSelf: "start",
					...corner,
					marginTop: "-0.25rem",
					marginLeft: "-0.25rem",
				}}
			/>
			<div
				style={{
					gridRow: 2,
					gridColumn: "1 / 6",
					position: "relative",
					...line,
				}}
			/>
			<div
				style={{
					gridRow: 4,
					gridColumn: "1 / 6",
					position: "relative",
					...line,
				}}
			/>
			<div
				style={{
					gridRow: "1 / 6",
					gridColumn: 2,
					position: "relative",
					...line,
				}}
			/>
			<div
				style={{
					gridRow: "1 / 6",
					gridColumn: 4,
					position: "relative",
					...line,
				}}
			/>
			<div
				tw="flex min-h-0 min-w-0 flex-col"
				style={{
					gridRow: 3,
					gridColumn: 3,
					boxSizing: "border-box",
					justifyContent: "space-between",
					padding: "4rem",
				}}
			>
				<div tw="flex flex-col">
					<div tw="flex items-center mb-12">
						<FastStatsIcon fill="#fafafa" style={{ width: 32, height: 42 }} />
						<div
							tw="text-2xl font-bold ml-3"
							style={{ fontFamily: "Geist Mono, monospace" }}
						>
							FastStats
						</div>
					</div>

					<div tw="flex flex-col">
						<div
							tw="text-6xl font-medium tracking-tight leading-tight mb-6"
							style={{
								fontFamily: "Geist, sans-serif",
								maxWidth: "900px",
							}}
						>
							{title}
						</div>
						{description && (
							<div
								tw="text-2xl leading-relaxed"
								style={{
									color: "#a1a1aa",
									maxWidth: "800px",
								}}
							>
								{description}
							</div>
						)}
					</div>
				</div>

				<div tw="flex w-full justify-between items-end">
					{label && (
						<div
							tw="flex px-4 py-2 text-base"
							style={{
								border: "1px solid #27272a",
								color: "#a1a1aa",
								fontFamily: "Geist Mono, monospace",
							}}
						>
							{label}
						</div>
					)}
					<div tw="flex" style={{ color: "#52525b" }}>
						faststats.dev
					</div>
				</div>
			</div>
		</div>
	);
}

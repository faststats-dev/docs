let dialog: HTMLDialogElement | undefined;

function getDialog() {
	if (dialog?.isConnected) return dialog;

	dialog = document.createElement("dialog");
	dialog.className = "image-zoom-dialog";
	dialog.setAttribute("aria-label", "Zoomed image");
	dialog.append(document.createElement("img"));
	dialog.addEventListener("click", () => dialog?.close());
	document.body.append(dialog);
	return dialog;
}

function openZoom(source: HTMLImageElement) {
	const target = getDialog();
	const img = target.querySelector("img")!;
	img.src = source.currentSrc || source.src;
	img.alt = source.alt;
	target.showModal();
}

function enhanceImage(img: HTMLImageElement) {
	if (img.closest("a")) return;
	img.classList.add("image-zoom");
	img.tabIndex = 0;
	img.setAttribute("role", "button");
	img.setAttribute("aria-haspopup", "dialog");
	img.addEventListener("click", () => openZoom(img));
	img.addEventListener("keydown", (event) => {
		if (event.key !== "Enter" && event.key !== " ") return;
		event.preventDefault();
		openZoom(img);
	});
}

export function enhanceImageZoom() {
	for (const img of document.querySelectorAll<HTMLImageElement>(".prose img")) {
		enhanceImage(img);
	}
}

export async function latestVersion(
	project: string,
	java8 = false,
): Promise<string> {
	try {
		const groupPath = java8 ? "j8/" : "";
		const response = await fetch(
			`https://repo.faststats.dev/api/maven/latest/version/releases/dev/faststats/metrics/${groupPath}${project}`,
			{
				cache: "force-cache",
			},
		);

		if (!response.ok) {
			return "VERSION";
		}

		const data = await response.json();
		return data.version;
	} catch {
		return "VERSION";
	}
}

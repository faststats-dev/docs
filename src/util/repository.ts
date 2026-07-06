export async function latestVersion(project: string): Promise<string> {
	try {
		const response = await fetch(
			`https://repo.faststats.dev/api/maven/latest/version/releases/dev/faststats/metrics/${project}`,
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

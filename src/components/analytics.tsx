import { Analytics } from "@faststats/react";

const siteKey = import.meta.env.PUBLIC_FASTSTATS_SITE_KEY;

export default function AnalyticsProvider() {
	if (!siteKey) return null;

	return (
		<Analytics
			siteKey={siteKey}
			webVitals={{ enabled: true }}
			sessionReplays={{ enabled: true }}
			errorTracking={{ enabled: true }}
		/>
	);
}

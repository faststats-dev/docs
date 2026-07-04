export function setup(version: string, token?: string) {
	return `
You are integrating FastStats error tracking into this Java/Kotlin project.

1. Add the FastStats Maven repository to the project's build file: https://repo.faststats.dev/releases
2. Add the platform-specific dependency with group \`dev.faststats.metrics\` and artifact ID matching your platform (bukkit, bungeecord, fabric, hytale, minestom, nukkit, sponge, or velocity).
  Configure your build tool to shade/shadow the dependency with relocation from \`dev.faststats\` to \`\${rootProject.group}.libs.faststats\` (or pick a better matching sub-package if available).
  Use version ${version} for all platforms.
3. Create a context-aware ErrorTracker as a public static final field on the main plugin/mod class:
  \`\`\`java
  public static final ErrorTracker ERROR_TRACKER = ErrorTracker.contextAware();
  \`\`\`
4. Create a metrics instance and inject the error tracker alongside with the project token:
  For most platforms, use:
  \`\`\`java
  private final <Platform>Metrics metrics = <Platform>Metrics.factory()
        .token("${token ?? "YOUR_TOKEN"}")
        .errorTracker(ERROR_TRACKER)
        .create(this); // For fabric, use the project's "mod_id" instead of "this"
  \`\`\`
  For injection driven platforms like Velocity, use:
  \`\`\`java
  private final VelocityMetrics.Factory metricsFactory;
  private @Nullable Metrics metrics = null; // initialize in onProxyInitialize

  @Inject
  public ExamplePlugin(final VelocityMetrics.Factory factory) {
      this.metricsFactory = factory;
  }
  \`\`\`
  and configure it in the \`onProxyInitialize\` event
  In Sponge, use:
  \`\`\`java
  private @Inject SpongeMetrics.Factory factory;
  private @Nullable Metrics metrics = null; // initialize in onServerStart
  \`\`\`
  and configure it in the \`onServerStart\` listener:
5. Call \`metrics.ready()\` in \`onEnable()/ProxyInitializeEvent\` and \`metrics.shutdown()\` in \`onDisable()/ProxyShutdownEvent\` or platform equivalent.
6. Add manual error tracking in existing \`catch\` blocks where monitoring would be valuable – always keep proper error handling first, then:
  \`\`\`java
  ERROR_TRACKER.trackError(throwable); // prefer a static import the error tracker constant
  \`\`\`

7. If the project already uses bStats, migrate existing custom charts to FastStats custom metrics using \`.addMetric()\` on the factory builder.
   Use the following mapping from bStats chart types to FastStats \`Metric\` factory methods:

   | bStats Chart Type   | Data Shape                       | FastStats Equivalent                                       |
   |---------------------|----------------------------------|------------------------------------------------------------|
   | \`SimplePie\`         | \`() -> String\`                   | \`Metric.string("id", () -> value)\`                         |
   | \`AdvancedPie\`       | \`() -> Map<String, Integer>\`     | \`Metric.stringArray("id", () -> keys)\` (use the map keys)  |
   | \`SingleLineChart\`   | \`() -> int\`                      | \`Metric.number("id", () -> value)\`                         |
   | \`MultiLineChart\`    | \`() -> Map<String, Integer>\`     | \`Metric.intArray("id", () -> values)\` (use the map values) |
   | \`SimpleBarChart\`    | \`() -> Map<String, Integer>\`     | \`Metric.intArray("id", () -> values)\` (use the map values) |
   | \`DrilldownPie\`      | \`() -> Map<String, Map<...>>\`    | \`Metric.stringArray()\` for the top-level keys              |

   Example – bStats \`SimplePie\` to FastStats:
   \`\`\`java
   // bStats (already exists)
   metrics.addCustomChart(new SimplePie("java_version", () -> System.getProperty("java.version")));

   // FastStats (add this)
   .addMetric(Metric.string("java_version", () -> System.getProperty("java.version")))
   \`\`\`

Rules:
- Do NOT replace existing error handling with the error tracker – it is for monitoring only.
- Keep metric suppliers thread-safe, pure, and lightweight — cache expensive values.
- When migrating from bStats, preserve the same metric IDs/names so dashboards stay consistent.
- Do NOT remove bStats from the project or change any of its configuration.
`;
}

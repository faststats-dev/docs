import { useStaticSearch } from "fumadocs-core/search/client";
import {
	SearchDialog,
	SearchDialogClose,
	SearchDialogContent,
	SearchDialogHeader,
	SearchDialogIcon,
	SearchDialogInput,
	SearchDialogList,
	SearchDialogOverlay,
	type SharedProps,
} from "fumadocs-ui/components/dialog/search";
import { useI18n } from "fumadocs-ui/contexts/i18n";

/** Searches the static index from `/api/search`, showing results before the user types. */
export default function DocsSearchDialog(props: SharedProps) {
	const { locale } = useI18n();
	const search = useStaticSearch({ locale, allowEmpty: true });

	return (
		<SearchDialog {...search} {...props}>
			<SearchDialogOverlay />
			<SearchDialogContent>
				<SearchDialogHeader>
					<SearchDialogIcon />
					<SearchDialogInput />
					<SearchDialogClose />
				</SearchDialogHeader>
				<SearchDialogList />
			</SearchDialogContent>
		</SearchDialog>
	);
}

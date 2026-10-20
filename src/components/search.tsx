"use client";

import { useStaticSearch } from "fumadocs-core/search/client/orama-static";
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

export default function DefaultSearchDialog(props: SharedProps) {
	const { search, onSearchChange, isLoading, data } = useStaticSearch({
		allowEmpty: true,
	});

	return (
		<SearchDialog
			search={search}
			onSearchChange={onSearchChange}
			isLoading={isLoading}
			{...props}
		>
			<SearchDialogOverlay />
			<SearchDialogContent>
				<SearchDialogHeader>
					<SearchDialogIcon />
					<SearchDialogInput />
					<SearchDialogClose />
				</SearchDialogHeader>
				<SearchDialogList items={data?.items ?? null} />
			</SearchDialogContent>
		</SearchDialog>
	);
}

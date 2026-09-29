"use client";

import { Download, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ResumeDownloadProps {
	dict: {
		label: string;
		light: string;
		dark: string;
	};
}

export function ResumeDownload({ dict }: ResumeDownloadProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button aria-label={dict.label} title={dict.label}>
					<Download className="h-[1.2rem] w-[1.2rem]" />
					<span className="sr-only">{dict.label}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem asChild>
					<a href="/resume/Nazariy-Petryk-Resume-Light.pdf" download>
						<Sun />
						{dict.light}
					</a>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<a href="/resume/Nazariy-Petryk-Resume-Dark.pdf" download>
						<Moon />
						{dict.dark}
					</a>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

"use client";

import { Category } from "@/sanity.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Popover } from "./popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { ChevronDownIcon, ChevronUpIcon, DoubleChevronDownIcon } from "@sanity/icons";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";

interface CategorySelectorProps {
  categories: Category[];
}

export function CategorySelectorComponent({
  categories,
}: CategorySelectorProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full max-w-full relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-green-500 hover:bg-green-700 hover:text-white text-white font-bold py-2 px-4 rounded">
          {value
            ? categories.find((category) => category._id === value)?.title
                      : "Filter by Category"}
                  

        <ChevronDownIcon className="ml-2 size-4  shrink-0" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search Category..."
            className="h-9"
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                const selectCategory = categories.find((c) =>
                  c.title
                    ?.toLowerCase()
                    .includes(e.currentTarget.value.toLowerCase())
                );
                if (selectCategory?.slug?.current) {
                  setValue(selectCategory._id);
                  router.push(`/categories/${selectCategory.slug.current}`);
                  setOpen(false);
                }
              }
            }}
          />

          <CommandList>
            <CommandEmpty>No category found. 😒</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category._id}
                  value={category.title}
                  onSelect={() => {
                    setValue(value === category._id ? "" : category._id);
                    router.push(`/categories/${category.slug?.current}`);
                    setOpen(false);
                  }}>
                  {category.title}
                  <CheckIcon
                    className={cn(
                      "ml-auto siz-4",
                      value === category._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

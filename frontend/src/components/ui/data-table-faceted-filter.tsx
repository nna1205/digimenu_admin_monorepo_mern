import { PlusCircleIcon } from "lucide-react";
import { Column } from "@tanstack/react-table";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Separator } from "./separator";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
  }[];
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={`max-w-max j`}>
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <div className="space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <div className="rounded-sm px-1 font-normal">
                    {selectedValues.size} selected
                  </div>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <div
                        key={option.value}
                        className="rounded-full px-2 py-1 font-normal bg-slate-200 "
                      >
                        {option.label}
                      </div>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px] z-20" align="start">
        <DropdownMenuGroup>
          {options.map((option) => {
            const isSelected = selectedValues.has(option.value);
            return (
              <DropdownMenuCheckboxItem
                checked={isSelected}
                key={option.value}
                className={`space-x-1`}
                onCheckedChange={() => {
                  if (isSelected) {
                    selectedValues.delete(option.value);
                  } else {
                    selectedValues.add(option.value);
                  }
                  const filterValues = Array.from(selectedValues);
                  column?.setFilterValue(
                    filterValues.length ? filterValues : undefined
                  );
                }}
              >
                <span>{option.label}</span>
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuGroup>
        {selectedValues.size > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onSelect={() => column?.setFilterValue('')}
                className="justify-center text-center"
              >
                Clear filters
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { useState } from "react";
import { Button } from "./ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export interface DogTableFooterProps {
  onPaginate: (query: string) => void;
  prev: string;
  next: string;
  itemsPerPage: number;
  setItemsPerPage: (count: number) => void;
}

export const DogTableFooter = ({
  onPaginate,
  prev,
  next,
  itemsPerPage,
  setItemsPerPage
}: DogTableFooterProps) => {
  return (
    <div className="flex items-center justify-between space-x-2 py-4">
      <Select
        value={itemsPerPage.toString()}
        onValueChange={(value) => setItemsPerPage(Number(value))}
      >
        <SelectTrigger className="w-auto">
          <SelectValue placeholder="Items per page" />
        </SelectTrigger>
        <SelectContent className="w-auto min-w-fit">
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPaginate(prev)}
          disabled={prev == undefined}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPaginate(next)}
          disabled={next == undefined}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

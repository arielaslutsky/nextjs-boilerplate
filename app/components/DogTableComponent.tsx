"use client";

import * as React from "react";

import { BASE_URL } from "@/app/common";
import { useEffect, useState } from "react";
import { DogTableFooter } from "./DogTableFooter";
import { DogTable } from "./SortingDogTable";
import { SearchResults, Dog } from "../interfaces";

interface DogTableComponentProps {
  searchResults: SearchResults;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  onPaginate: (query: string) => void;
  rowSelection: Record<string, boolean>;
  setRowSelection: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  itemsPerPage: number;
  setItemsPerPage: (count: number) => void;
}

export function DogTableComponent({
  searchResults,
  isLoading,
  setIsLoading,
  onPaginate,
  rowSelection,
  setRowSelection,
  itemsPerPage,
  setItemsPerPage
}: DogTableComponentProps) {
  const [dogs, setDogs] = useState<Dog[]>([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(BASE_URL + "/dogs", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(searchResults?.resultIds)
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDogs(data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error("Fetch error:", e);
        setIsLoading(false);
      });
  }, [searchResults.resultIds]);

  useEffect(() => {
    setIsLoading(false);
  }, [dogs]);

  return (
    <>
      {searchResults.resultIds.length > 0 && (
        <>
          {isLoading ? (
            <span className="centered">Loading...</span>
          ) : (
            <>
              <DogTable
                dogs={dogs}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
                itemsPerPage={itemsPerPage}
              />
              <DogTableFooter
                onPaginate={(query: string) => {
                  onPaginate(query);
                }}
                prev={searchResults.prev}
                next={searchResults.next}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
              />
            </>
          )}
        </>
      )}
    </>
  );
}

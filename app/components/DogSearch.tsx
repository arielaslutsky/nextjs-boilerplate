import * as React from "react";

import { MultiSelect } from "./MultiSelect";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "./ui/card";
import { Input } from "./ui/input";
import { DefaultSortOptions, SearchParams } from "../interfaces";

type SearchProps = {
  breeds?: string[];
  searchParams: SearchParams;
  setSearchParams: (searchParams: SearchParams) => void;
  searchDogs: () => void;
  findMyMatch: () => void;
  isMatchButtonDisabled: boolean;
};

export function Search({
  breeds,
  searchParams,
  setSearchParams,
  searchDogs,
  findMyMatch,
  isMatchButtonDisabled
}: SearchProps) {
  const setSelectedOptions = (breeds: string[]) => {
    setSearchParams({
      ...searchParams,
      breeds: breeds
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Find a new friend!</CardTitle>
        <CardDescription>
          Use the form below to filter dogs based on breed, age, or zip code.
          Then select your favorites and fetch your match.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex w-full gap-4">
            <div>
              <Label htmlFor="breeds">Breeds</Label>
              <MultiSelect
                options={breeds || []}
                selectedOptions={searchParams.breeds}
                setSelectedOptions={setSelectedOptions}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="minAge">Min Age</Label>
              <Input
                id="minAge"
                placeholder="Min Age"
                value={searchParams.minAge ?? ""}
                onChange={(e) => {
                  setSearchParams({
                    ...searchParams,
                    minAge: Number(e.target.value) // Add new breed while preserving existing ones
                  });
                }}
              />
            </div>
            <div className="flex-col w-full">
              <Label htmlFor="maxAge">Max Age</Label>
              <Input
                id="maxAge"
                placeholder="Max Age"
                value={searchParams?.maxAge ?? ""}
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    maxAge: Number(e.target.value) // Add new breed while preserving existing ones
                  })
                }
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <Button onClick={findMyMatch} disabled={isMatchButtonDisabled}>
            Find My Match
          </Button>
        </div>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={() => {
              setSearchParams({
                breeds: [],
                sortOptions: new DefaultSortOptions()
              });
            }}
          >
            Cancel
          </Button>
          <Button onClick={searchDogs}>Find Dogs</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

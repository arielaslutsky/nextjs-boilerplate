"use client";

import { BASE_URL } from "@/common";
import { useEffect, useState } from "react";
import "@/styles.css";
import { Search } from "./DogSearch";
import { DogTableComponent } from "./DogTableComponent";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MatchCard } from "./MatchCard";
import { LogOut } from "lucide-react";
import LogoutButton from "./Logout";

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

interface Coordinates {
  lat: number;
  lon: number;
}

export interface SearchParams {
  breeds: string[];
  zipCodes?: number[];
  minAge?: number;
  maxAge?: number;
  size?: number;
  from?: number;
  sortOptions: SortOptions;
}

interface SortOptions {
  field: string;
  order: "asc" | "desc";
}

export class DefaultSortOptions implements SortOptions {
  field = "breed";
  order: "asc" = "asc";
}

export interface SearchResults {
  resultIds: string[];
  total?: number;
  next: string;
  prev: string;
}

const DogPage = () => {
  const router = useRouter();
  const [breeds, setBreeds] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    breeds: [],
    sortOptions: new DefaultSortOptions(),
    size: 25
  });
  const [searchResults, setSearchResults] = useState<SearchResults>({
    resultIds: [],
    next: "",
    prev: ""
  });
  const [isLoadingDogs, setIsLoadingDogs] = useState(true);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [matchId, setMatchId] = useState<string>();
  const [match, setMatch] = useState<Dog>({
    age: 0,
    breed: "",
    name: "",
    id: "",
    img: "",
    zip_code: ""
  });
  const [itemsPerPage, setItemsPerPage] = useState<number>(25);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_URL + "/dogs/breeds", {
          method: "GET",
          credentials: "include"
        });
        if (response.status === 401) {
          router.push("/?sessionExpired=true");
          // localStorage.setItem("redirectMessage", "User redirected");
        } else if (response.ok) {
          const data = await response.json();
          setBreeds(data);
        } else {
          console.error(`Request failed with status ${response.status}`);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  const getSearchParams = () => {
    const params = new URLSearchParams();
    searchParams?.breeds?.forEach((breed) => params.append("breeds", breed));
    searchParams?.zipCodes?.forEach((zip) =>
      params.append("zipCodes", zip.toString())
    );
    if (searchParams?.minAge !== undefined) {
      params.append("minAge", searchParams.minAge.toString());
    }
    if (searchParams?.maxAge !== undefined) {
      params.append("maxAge", searchParams.maxAge.toString());
    }
    if (searchParams?.size !== undefined) {
      params.append("size", searchParams.size.toString());
    }
    if (searchParams?.from !== undefined) {
      params.append("from", searchParams.from.toString());
    }
    return params;
  };

  const searchDogs = () => {
    const params = getSearchParams();
    fetch(BASE_URL + `/dogs/search?${params.toString()}`, {
      method: "GET",
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data);
      })
      .catch((err) => console.error(err));
  };

  const paginateDogs = (query: string) => {
    fetch(BASE_URL + `/dogs/search?${query}`, {
      method: "GET",
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data);
      })
      .catch((err) => console.error(err));
  };

  const findMyMatch = () => {
    fetch(BASE_URL + `/dogs/match`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(Object.keys(rowSelection))
    })
      .then((res) => res.json())
      .then((data) => {
        setMatchId(data.match);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (matchId) {
      fetch(BASE_URL + `/dogs`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify([matchId])
      })
        .then((res) => res.json())
        .then((data) => {
          setMatch(data[0]);
        })
        .catch((err) => console.error(err));
    }
  }, [matchId]);

  useEffect(() => {
    if (searchResults.resultIds.length != 0) {
      searchDogs();
    }
  }, [searchParams.size]);

  return (
    <>
      <LogoutButton />
      {match?.id != "" ? (
        <div className="pt-4">
          <MatchCard
            key={match.id}
            dog={match}
            reset={() => {
              setMatch({
                age: 0,
                breed: "",
                name: "",
                id: "",
                img: "",
                zip_code: ""
              });
              setMatchId("");
            }}
          />
        </div>
      ) : (
        <div className="dogs">
          {breeds.length > 0 ? (
            <>
              <Search
                breeds={breeds}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                searchDogs={searchDogs}
                findMyMatch={findMyMatch}
                isMatchButtonDisabled={Object.keys(rowSelection).length == 0}
              />
              <DogTableComponent
                searchResults={searchResults}
                isLoading={isLoadingDogs}
                setIsLoading={setIsLoadingDogs}
                onPaginate={paginateDogs}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={(count: number) => {
                  setItemsPerPage(count);
                  setSearchParams({
                    ...searchParams,
                    size: count
                  });
                }}
              />
            </>
          ) : (
            <span className="centered">Loading...</span>
          )}
        </div>
      )}
    </>
  );
};

export default DogPage;

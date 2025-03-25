import * as React from "react";

import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "./ui/card";
import { Dog } from "../interfaces";

type MatchCardProps = {
  dog: Dog;
  reset: () => void;
};

export function MatchCard({ dog, reset }: MatchCardProps) {
  return (
    <Card className="p-6 max-w-sm mx-auto">
      <CardHeader className="text-center space-y-4">
        <CardTitle>{`${dog.name} will be a great match for you!`}</CardTitle>
        <div className="flex justify-center">
          <img
            src={dog.img}
            alt="Dog"
            className="w-[192px] h-[192px] object-cover rounded-md"
          />
        </div>
        <CardDescription className="text-sm text-gray-600">
          {`${dog.name} is a ${dog.age} year old ${dog.breed}.`}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Button onClick={reset}>Back to Search</Button>
      </CardFooter>
    </Card>
  );
}

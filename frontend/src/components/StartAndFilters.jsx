import React from "react";
import { Badge } from "./ui/badge";
import { FilterType } from "../lib/data";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

const StartAndFilters = ({
  setFilter,
  completedTasksCount,
  activeTasksCount,
  filter,
  handlePageChange,
}) => {
  return (
    <div className="flex flex-col items-start justify- gap-4 sm:flex-row sm:items-center ">
      {/**Display list badge counts, active, complete */}
      <div className="flex gap-3">
        <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-info/20"
        >
          {activeTasksCount} {FilterType.active}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-white/50 text-success border-success/20"
        >
          {completedTasksCount} {FilterType.completed}
        </Badge>
        {/**Display Filter */}
        <div className="flex flex-col gap-2 sm:flex-row">
          {Object.keys(FilterType).map((type) => (
            <Button
              key={type}
              variant={filter === type ? "gradient" : "ghost"}
              size="sm"
              className="capitalize rounded-md"
              onClick={() => {
                setFilter(type);
                handlePageChange(1);
              }}
            >
              <Filter className="size-4" />
              {FilterType[type]}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartAndFilters;

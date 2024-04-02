import { useForm } from "react-hook-form";
import { FilterJobFormValues, filterJobFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { SelectField } from "@/components/form";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect } from "react";

const fromAgeOptions = [
  { value: "1", label: "Last 24 hours" },
  { value: "3", label: "Last 3 days" },
  { value: "7", label: "Last 7 days" },
  { value: "14", label: "Last 14 days" },
];

const sortByOptions = [
  { value: "createdAt", label: "Date" },
  { value: "updatedAt", label: "Relevance" },
];

type FilterJobFormProps = {
  total?: number;
};

export const FilterJobForm = ({ total }: FilterJobFormProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const form = useForm<FilterJobFormValues>({
    defaultValues: {
      fromAge:
        (searchParams.get("fromAge") as FilterJobFormValues["fromAge"]) ?? "",
      sortBy:
        (searchParams.get("sortBy") as FilterJobFormValues["sortBy"]) ?? "",
    },
    resolver: zodResolver(filterJobFormSchema),
  });
  const { control, reset } = form;
  const isFilterActive =
    total !== 0 &&
    (!!searchParams.get("fromAge") || !!searchParams.get("sortBy"));

  const handleClickOnChange = (key: string, value: string) => {
    setSearchParams((params) => {
      params.set(key, value);
      params.set("page", "1");

      if (params.get("jobId")) {
        params.delete("jobId");
      }

      return params;
    });
  };

  const handleClickResetFilters = () => {
    setSearchParams((params) => {
      params.delete("fromAge");
      params.delete("sortBy");

      return params;
    });

    reset({
      fromAge: "",
      sortBy: "",
    });
  };

  useEffect(() => {
    const fromAgeParams = searchParams.get("fromAge");
    const sortByParams = searchParams.get("sortBy");

    if (total === 0 || (!fromAgeParams && !sortByParams)) {
      reset({
        fromAge: "",
        sortBy: "",
      });
    }
  }, [reset, searchParams, total]);

  return (
    <Form {...form}>
      <form
        id="filter-job-form"
        role="form"
        noValidate
        className="flex flex-col sm:flex-row gap-3"
      >
        {isFilterActive && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleClickResetFilters}
          >
            Clear Filters <X className="icon ml-1 opacity-50" />
          </Button>
        )}
        <SelectField
          control={control}
          name="sortBy"
          placeholder="Sort By"
          options={sortByOptions}
          onChangeCallback={handleClickOnChange}
          SelectProps={{
            disabled: total === 0 ? true : false,
          }}
        />

        <SelectField
          control={control}
          name="fromAge"
          placeholder="Date Posted"
          options={fromAgeOptions}
          onChangeCallback={handleClickOnChange}
          SelectProps={{
            disabled: total === 0 ? true : false,
          }}
        />
      </form>
    </Form>
  );
};

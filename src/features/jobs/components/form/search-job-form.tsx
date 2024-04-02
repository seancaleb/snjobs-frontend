import { SubmitHandler, useForm } from "react-hook-form";
import { SearchJobFormValues, searchJobFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Combobox, InputField } from "@/components/form";
import { Button } from "@/components/ui/button";
import { DEFAULT_CITIES } from "../..";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const locations = DEFAULT_CITIES.map((city) => ({
  label: city,
  value: city.toLowerCase(),
}));

export const SearchJobForm = () => {
  const form = useForm<SearchJobFormValues>({
    defaultValues: {
      keyword: "",
      location: "",
    },
    resolver: zodResolver(searchJobFormSchema),
  });
  const { control, handleSubmit, setValue, reset } = form;
  const [searchParams, setSearchParams] = useSearchParams();

  const onSubmit: SubmitHandler<SearchJobFormValues> = (values) => {
    const valuesEntries = Object.entries(values);

    setSearchParams((params) => {
      valuesEntries.forEach(([k, v]) => {
        if (!v) {
          params.delete(k);
        } else {
          params.set(k, v);
        }
      });

      params.set("page", "1");

      const activeParams = ["jobId", "sortBy", "fromAge"];

      activeParams.forEach((p) => {
        if (params.get(p)) {
          params.delete(p);
        }
      });

      return params;
    });
  };

  useEffect(() => {
    reset({
      keyword: searchParams.get("keyword") ?? "",
      location:
        (searchParams.get("location") as SearchJobFormValues["location"]) ?? "",
    });
  }, [reset, searchParams]);

  return (
    <Form {...form}>
      <form
        id="search-job-form"
        role="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row gap-3 max-w-3xl w-full"
      >
        <InputField
          control={control}
          name="keyword"
          placeholder="Job titles or keyword"
        />

        <Combobox
          control={control}
          name="location"
          placeholder="Select location"
          setValue={setValue}
          options={locations}
          btnPlaceholder="Select a location"
          notFoundMessage="Location not found."
        />

        <Button type="submit">Find jobs</Button>
      </form>
    </Form>
  );
};

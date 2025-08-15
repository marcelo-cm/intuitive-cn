# Usage

```tsx
const BasicExample: React.FC = () => {
  const { currentSearchParams, updateSearchParam, removeSearchParams } =
    useUpdateSearchParams();

  const form = useForm<ParamFormData>({
    defaultValues: {
      key: '',
      value: '',
    },
    resolver: zodResolver(PARAM_SCHEMA),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const watchedKey = form.watch('key');

  const isUpdatingExistingParam =
    Object.keys(currentSearchParams).includes(watchedKey);

  const searchParamEntries = Object.entries(currentSearchParams);

  const handleAddParam = useCallback(
    (data: ParamFormData) => {
      updateSearchParam(data.key, data.value);
      form.reset();
    },
    [updateSearchParam, form, removeSearchParams],
  );

  const handleRemoveParam = useCallback(
    (key: string) => {
      removeSearchParams([key]);
    },
    [removeSearchParams, form],
  );

  return (
    <div>
      <p className="text-muted-foreground mb-2 text-sm">
        {isUpdatingExistingParam
          ? 'Update search parameter'
          : 'Add a new search parameter'}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleAddParam)}
          className="flex flex-row gap-3"
        >
          <FormField
            control={form.control}
            name="key"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Key" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Value" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={!form.formState.isValid}
            variant={Variant.PRIMARY}
            size={Size.SM}
            icon
            shadow
          >
            <PlusIcon />
          </Button>
        </form>
      </Form>
    </div>
  );
};
```

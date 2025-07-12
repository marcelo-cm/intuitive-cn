import React, { useCallback } from 'react';

import { PlusIcon } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/intuitive-ui/(native)/button';
import {
  Size,
  Variant,
} from '@/components/intuitive-ui/(native)/component-enums';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useUpdateSearchParams } from '@/hooks/use-update-search-params';

import Container from '@/app/[topic]/[slug]/_components/container';

const PARAM_SCHEMA = z.object({
  key: z.string().min(1, 'Key is required').trim(),
  value: z.string().min(1, 'Value is required').trim(),
});

type ParamFormData = z.infer<typeof PARAM_SCHEMA>;

const SearchParamForm = () => {
  const { currentSearchParams, updateSearchParam } = useUpdateSearchParams();

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

  const handleAddParam = useCallback(
    (data: ParamFormData) => {
      updateSearchParam(data.key, data.value);
      form.reset();
    },
    [updateSearchParam, form],
  );

  return (
    <Container className="md:col-span-2">
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
    </Container>
  );
};

export default SearchParamForm;

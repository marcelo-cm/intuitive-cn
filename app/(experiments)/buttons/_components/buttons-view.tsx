'use client';

import { useState } from 'react';

import {
  Accessibility,
  AlertCircle,
  ArrowRight,
  BetweenVerticalEnd,
  Bolt,
  Brush,
  Check,
  CircleDashed,
  Code,
  Download,
  Edit,
  Group,
  Layers,
  Loader,
  Mail,
  MousePointerClickIcon,
  Plus,
  Ruler,
  Save,
  Trash,
  Upload,
} from 'lucide-react';

import { toast } from 'sonner';

import { TextLevel } from '@/components/intuitive/(native)/(typography)/enums';
import { Subtitle } from '@/components/intuitive/(native)/(typography)/subtitle';
import { Title } from '@/components/intuitive/(native)/(typography)/title';
import { Button, ButtonGroup } from '@/components/intuitive/(native)/button';
import CodeBlock from '@/components/intuitive/(native)/code-block';
import {
  Accent,
  Orientation,
  Shadow,
  Size,
  Variant,
} from '@/components/intuitive/(native)/enums';

const ButtonsView = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-16 px-4 py-16">
      <section className="space-y-4">
        <Title LeadingIcon={MousePointerClickIcon} isSectionHeading>
          Buttons
        </Title>
        <Subtitle>
          Built with Radix, Tailwind, strongly typed with enums, and with web
          accessibility in mind.
        </Subtitle>
        <p className="text-muted-foreground">
          Controlled entirely with CSS variables, this button is built to cover
          the advanced use cases of buttons across web-apps. It has a
          comprehensive set of properties to minimize the custom CSS and code
          needed.
        </p>
        <p className="text-accent text-sm">
          Perhaps it is the most opinionated button component you will ever
          use... but it is also the most powerful.
        </p>
      </section>
      <hr />
      {/* Variants Section */}
      <section className="space-y-4">
        <Title LeadingIcon={Bolt} isSectionHeading>
          Variants
        </Title>
        <Subtitle>
          Button comes with different variants to represent different actions.
        </Subtitle>
        <div className="rounded-lg bg-gray-50 p-6">
          <div className="flex flex-wrap gap-4">
            <div>
              <h3 className="mb-3 text-lg font-medium">Generic</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant={Variant.PRIMARY}>Primary</Button>
                <Button variant={Variant.SECONDARY}>Secondary</Button>
                <Button variant={Variant.GHOST}>Ghost</Button>
                <Button variant={Variant.LINK}>Link</Button>
                <Button variant={Variant.OUTLINE}>Outline</Button>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">Indicators</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant={Variant.ACCENT}>Accent</Button>
                <Button variant={Variant.DESTRUCTIVE}>Destructive</Button>
                <Button variant={Variant.SUCCESS}>Success</Button>
                <Button variant={Variant.WARNING}>Warning</Button>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-medium">Inverted</h3>
              <div className="flex flex-wrap gap-4">
                <Button invert variant={Variant.PRIMARY}>
                  Primary
                </Button>
                <Button invert variant={Variant.SECONDARY}>
                  Secondary
                </Button>
                <Button invert variant={Variant.ACCENT}>
                  Accent
                </Button>
                <Button invert variant={Variant.DESTRUCTIVE}>
                  Destructive
                </Button>
                <Button invert variant={Variant.SUCCESS}>
                  Success
                </Button>
                <Button invert variant={Variant.WARNING}>
                  Warning
                </Button>
              </div>
            </div>
          </div>
        </div>
        <CodeBlock
          code={`<Button variant={Variant.PRIMARY}>Primary</Button>
<Button variant={Variant.SECONDARY}>Secondary</Button>
<Button variant={Variant.GHOST}>Ghost</Button>
<Button variant={Variant.LINK}>Link</Button>
<Button variant={Variant.OUTLINE}>Outline</Button>
<Button variant={Variant.ACCENT}>Accent</Button>
<Button variant={Variant.DESTRUCTIVE}>Destructive</Button>
<Button variant={Variant.SUCCESS}>Success</Button>
<Button variant={Variant.WARNING}>Warning</Button>

// Inverted colors — Swaps the foreground and background colors
<Button invert variant={Variant.PRIMARY}>Primary</Button>
<Button invert variant={Variant.SECONDARY}>Secondary</Button>
<Button invert variant={Variant.ACCENT}>Accent</Button>
<Button invert variant={Variant.DESTRUCTIVE}>Destructive</Button>
<Button invert variant={Variant.SUCCESS}>Success</Button>
<Button invert variant={Variant.WARNING}>Warning</Button>`}
        />
      </section>

      {/* Sizes Section */}
      <section className="space-y-4">
        <Title LeadingIcon={Ruler} isSectionHeading>
          Sizes
        </Title>
        <Subtitle>
          Buttons come in multiple sizes to fit various UI contexts.
        </Subtitle>

        <div className="rounded-lg bg-gray-50 p-6">
          <div className="flex flex-wrap items-center gap-4">
            <Button size={Size.XXXS}>XXXS</Button>
            <Button size={Size.XXS}>XXS</Button>
            <Button size={Size.XS}>XS</Button>
            <Button size={Size.SM}>SM</Button>
            <Button size={Size.MD}>MD</Button>
            <Button size={Size.LG}>LG</Button>
            <Button size={Size.XL}>XL</Button>
            <Button size={Size.XXL}>XXL</Button>
            <Button size={Size.XXXL}>XXXL</Button>
          </div>
        </div>

        <CodeBlock
          code={`<Button size={Size.XXXS}>XXXS</Button>
<Button size={Size.XXS}>XXS</Button>
<Button size={Size.XS}>XS</Button>
<Button size={Size.SM}>SM</Button>
<Button size={Size.MD}>MD</Button>
<Button size={Size.LG}>LG</Button>
<Button size={Size.XL}>XL</Button>
<Button size={Size.XXL}>XXL</Button>
<Button size={Size.XXXL}>XXXL</Button>`}
        />
      </section>

      {/* Icon Buttons Section */}
      <section className="space-y-4">
        <Title LeadingIcon={CircleDashed} isSectionHeading level={TextLevel.H3}>
          Icon Buttons
        </Title>
        <Subtitle>
          Buttons can be configured as icon-only buttons in various sizes.
        </Subtitle>

        <div className="rounded-lg bg-gray-50 p-6">
          <div className="flex flex-wrap items-center gap-4">
            <Button icon size={Size.XXXS} aria-label="Add item">
              <Plus />
            </Button>
            <Button icon size={Size.XXS} aria-label="Add item">
              <Plus />
            </Button>
            <Button icon size={Size.XS} aria-label="Add item">
              <Plus />
            </Button>
            <Button icon size={Size.SM} aria-label="Add item">
              <Plus />
            </Button>
            <Button icon size={Size.MD} aria-label="Add item">
              <Plus />
            </Button>
            <Button icon size={Size.LG} aria-label="Add item">
              <Plus />
            </Button>
            <Button icon size={Size.XL} aria-label="Add item">
              <Plus />
            </Button>
            <Button icon size={Size.XXL} aria-label="Add item">
              <Plus />
            </Button>
            <Button icon size={Size.XXXL} aria-label="Add item">
              <Plus />
            </Button>
          </div>
        </div>

        <CodeBlock
          code={`<Button icon size={Size.XXXS} aria-label="Add item"><Plus /></Button>
<Button icon size={Size.XXS} aria-label="Add item"><Plus /></Button>
<Button icon size={Size.XS} aria-label="Add item"><Plus /></Button>
<Button icon size={Size.SM} aria-label="Add item"><Plus /></Button>
<Button icon size={Size.MD} aria-label="Add item"><Plus /></Button>
<Button icon size={Size.LG} aria-label="Add item"><Plus /></Button>
<Button icon size={Size.XL} aria-label="Add item"><Plus /></Button>
<Button icon size={Size.XXL} aria-label="Add item"><Plus /></Button>
<Button icon size={Size.XXXL} aria-label="Add item"><Plus /></Button>`}
        />
      </section>

      {/* Rounded & Shadow Section */}
      <section className="space-y-4">
        <Title LeadingIcon={Layers} isSectionHeading level={TextLevel.H3}>
          Rounded & Shadow Variants
        </Title>
        <Subtitle>
          Buttons can have rounded corners and different shadow depths.
        </Subtitle>

        <div className="rounded-lg bg-gray-50 p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <h3 className="mb-3 text-lg font-medium">Rounded</h3>
              <div className="flex flex-wrap gap-4">
                <Button rounded>Rounded</Button>
                <Button rounded icon aria-label="Add">
                  <Plus />
                </Button>
              </div>
            </div>
            <div className="col-span-2">
              <h3 className="mb-3 text-lg font-medium">Shadow</h3>
              <div className="flex flex-wrap gap-4">
                <Button shadow={Shadow.SM}>Small Shadow</Button>
                <Button shadow={Shadow.MD}>Medium Shadow</Button>
                <Button shadow={Shadow.LG}>Large Shadow</Button>
              </div>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// Rounded buttons
<Button rounded>Rounded</Button>
<Button rounded variant={Variant.SECONDARY}>Rounded</Button>
<Button rounded variant={Variant.OUTLINE}>Rounded</Button>
<Button rounded icon aria-label="Add"><Plus /></Button>

// Shadow variants
<Button shadow={Shadow.SM}>Small Shadow</Button>
<Button shadow={Shadow.MD}>Medium Shadow</Button>
<Button shadow={Shadow.LG}>Large Shadow</Button>`}
        />
      </section>

      {/* Accent & Invert Section */}
      <section className="space-y-4">
        <Title LeadingIcon={Brush} isSectionHeading level={TextLevel.H3}>
          Accent & Invert Variants
        </Title>
        <Subtitle>
          Buttons can have accent colors and inverted color schemes.
        </Subtitle>
        <p className="text-muted-foreground text-sm">
          Please hover over the buttons to see the accent colors.
        </p>

        <div className="mb-4 rounded-lg bg-gray-50 p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-medium">Accent Colors</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant={Variant.GHOST} accent={Accent.DESTRUCTIVE}>
                  Destructive
                </Button>
                <Button variant={Variant.GHOST} accent={Accent.SUCCESS}>
                  Success
                </Button>
                <Button variant={Variant.GHOST} accent={Accent.WARNING}>
                  Warning
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="mb-3 text-lg font-medium">Inverted Accent</h3>
            <div className="flex flex-wrap gap-4">
              <Button
                variant={Variant.GHOST}
                accent={Accent.DESTRUCTIVE}
                invertAccent
              >
                Inverted Destructive
              </Button>
              <Button
                variant={Variant.GHOST}
                accent={Accent.SUCCESS}
                invertAccent
              >
                Inverted Success
              </Button>
              <Button
                variant={Variant.GHOST}
                accent={Accent.WARNING}
                invertAccent
              >
                Inverted Warning
              </Button>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`import { Button } from "@/components/ui/button"
import { Accent, Variant } from "@/components/ui/button/enums"

// Accent colors
<Button variant={Variant.GHOST} accent={Accent.DESTRUCTIVE}>Destructive</Button>
<Button variant={Variant.GHOST} accent={Accent.SUCCESS}>Success</Button>
<Button variant={Variant.GHOST} accent={Accent.WARNING}>Warning</Button>

// Inverted colors
<Button invert variant={Variant.PRIMARY}>Inverted Primary</Button>
<Button invert variant={Variant.SECONDARY}>Inverted Secondary</Button>
<Button invert variant={Variant.DESTRUCTIVE}>Inverted Destructive</Button>

// Inverted accent colors
<Button variant={Variant.GHOST} accent={Accent.DESTRUCTIVE} invertAccent>Inverted Destructive</Button>
<Button variant={Variant.GHOST} accent={Accent.SUCCESS} invertAccent>Inverted Success</Button>
<Button variant={Variant.GHOST} accent={Accent.WARNING} invertAccent>Inverted Warning</Button>`}
        />
      </section>

      {/* States Section */}
      <section className="space-y-4">
        <Title LeadingIcon={Loader} isSectionHeading level={TextLevel.H3}>
          States
        </Title>
        <Subtitle>
          Buttons can be disabled or show a loading state. In the loading state
          it preserves it&apos;s width. to prevent layout shifts. While loading
          the button is not interactive.
        </Subtitle>

        <div className="mb-4 rounded-lg bg-gray-50 p-6">
          <div className="flex flex-wrap gap-4">
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
            <Button
              onClick={handleLoadingClick}
              loading={isLoading}
              LeadingIcon={MousePointerClickIcon}
            >
              Click to Load
            </Button>
          </div>
        </div>

        <CodeBlock
          code={`export function LoadingButtonExample() {
  const [isLoading, setIsLoading] = useState(false)
  
  const handleClick = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <React.Fragment>
      {/* Disabled button */}
      <Button disabled>Disabled</Button>
      
      {/* Always loading button */}
      <Button loading>Loading</Button>
      
      {/* Loading button that toggles state */}
      <Button onClick={handleClick} loading={isLoading} LeadingIcon={MousePointerClickIcon}>
        Click to Load
      </Button>
    </React.Fragment>
  )
}`}
        />
      </section>

      {/* With Icons Section */}
      <section className="space-y-4">
        <Title
          LeadingIcon={BetweenVerticalEnd}
          isSectionHeading
          level={TextLevel.H3}
        >
          With Icons
        </Title>
        <Subtitle>Buttons can include leading and trailing icons.</Subtitle>

        <div className="mb-4 rounded-lg bg-gray-50 p-6">
          <div className="flex flex-wrap gap-4">
            <Button LeadingIcon={Mail}>Email</Button>
            <Button TrailingIcon={ArrowRight}>Next</Button>
            <Button LeadingIcon={Download} TrailingIcon={ArrowRight}>
              Download
            </Button>
            <Button variant={Variant.DESTRUCTIVE} LeadingIcon={Trash}>
              Delete
            </Button>
            <Button variant={Variant.SUCCESS} LeadingIcon={Check}>
              Approve
            </Button>
            <Button variant={Variant.WARNING} LeadingIcon={AlertCircle}>
              Warning
            </Button>
          </div>
        </div>

        <CodeBlock
          code={`<Button LeadingIcon={Mail}>Email</Button>
<Button TrailingIcon={ArrowRight}>Next</Button>
<Button LeadingIcon={Download} TrailingIcon={ArrowRight}>Download</Button>

// Variant buttons with icons
<Button variant={Variant.DESTRUCTIVE} LeadingIcon={Trash}>Delete</Button>
<Button variant={Variant.SUCCESS} LeadingIcon={Check}>Approve</Button>
<Button variant={Variant.WARNING} LeadingIcon={AlertCircle}>Warning</Button>`}
        />
      </section>

      {/* Button Group Section */}
      <section>
        <Title LeadingIcon={Group} isSectionHeading level={TextLevel.H3}>
          Button Group
        </Title>
        <Subtitle>
          Related buttons can be grouped together for accessibility and
          organization.
        </Subtitle>

        <div className="mb-4 rounded-lg bg-gray-50 p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-medium">Horizontal</h3>
              <ButtonGroup aria-label="File actions">
                <Button variant={Variant.OUTLINE} LeadingIcon={Edit}>
                  Edit
                </Button>
                <Button variant={Variant.OUTLINE} LeadingIcon={Save}>
                  Save
                </Button>
                <Button variant={Variant.OUTLINE} LeadingIcon={Upload}>
                  Upload
                </Button>
              </ButtonGroup>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-medium">Vertical</h3>
              <ButtonGroup
                aria-label="Navigation actions"
                orientation={Orientation.VERTICAL}
              >
                <Button variant={Variant.OUTLINE}>Home</Button>
                <Button variant={Variant.OUTLINE}>Products</Button>
                <Button variant={Variant.OUTLINE}>About</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// Horizontal button group (default)
<ButtonGroup aria-label="File actions">
  <Button variant={Variant.OUTLINE} LeadingIcon={Edit}>Edit</Button>
  <Button variant={Variant.OUTLINE} LeadingIcon={Save}>Save</Button>
  <Button variant={Variant.OUTLINE} LeadingIcon={Upload}>Upload</Button>
</ButtonGroup>

// Vertical button group
<ButtonGroup aria-label="Navigation actions" orientation={Orientation.VERTICAL}>
  <Button variant={Variant.OUTLINE}>Home</Button>
  <Button variant={Variant.OUTLINE}>Products</Button>
  <Button variant={Variant.OUTLINE}>About</Button>
</ButtonGroup>`}
        />
      </section>

      {/* Accessibility Section */}
      <section className="space-y-4">
        <Title
          LeadingIcon={Accessibility}
          isSectionHeading
          level={TextLevel.H3}
        >
          Accessibility
        </Title>
        <div className="mb-4 rounded-lg bg-gray-50 p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-medium">Icon Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button
                  icon
                  aria-label="Add item"
                  description="Adds a new item to your collection"
                >
                  <Plus />
                </Button>
                <Button
                  icon
                  variant={Variant.DESTRUCTIVE}
                  aria-label="Delete item"
                >
                  <Trash />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-medium">Loading State</h3>
              <div className="flex flex-wrap gap-4">
                <Button loading aria-label="Saving document">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// Icon button with aria-label and description
<Button 
  icon 
  aria-label="Add item" 
  description="Adds a new item to your collection"
>
  <Plus />
</Button>

// Icon button with aria-label
<Button 
  icon 
  variant={Variant.DESTRUCTIVE} 
  aria-label="Delete item"
>
  <Trash />
</Button>

// Loading button with aria-label
<Button loading aria-label="Saving document">
  Save
</Button>`}
        />
      </section>

      {/* API Reference Section */}
      <section className="space-y-4">
        <Title LeadingIcon={Code} isSectionHeading level={TextLevel.H3}>
          API Reference
        </Title>
        <Subtitle>Complete reference for the Button component props.</Subtitle>

        <div className="overflow-hidden rounded-lg border bg-gray-50">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Prop
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Default
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr>
                <td className="px-4 py-3 text-sm font-medium">variant</td>
                <td className="px-4 py-3 text-sm text-gray-500">Variant</td>
                <td className="px-4 py-3 text-sm text-gray-500">PRIMARY</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  The visual style of the button
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">size</td>
                <td className="px-4 py-3 text-sm text-gray-500">Size</td>
                <td className="px-4 py-3 text-sm text-gray-500">MD</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  The size of the button
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">icon</td>
                <td className="px-4 py-3 text-sm text-gray-500">boolean</td>
                <td className="px-4 py-3 text-sm text-gray-500">false</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  Whether the button is an icon button
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">rounded</td>
                <td className="px-4 py-3 text-sm text-gray-500">boolean</td>
                <td className="px-4 py-3 text-sm text-gray-500">false</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  Whether the button has fully rounded corners
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">shadow</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  boolean | Shadow
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">undefined</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  The shadow depth of the button
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">accent</td>
                <td className="px-4 py-3 text-sm text-gray-500">Accent</td>
                <td className="px-4 py-3 text-sm text-gray-500">undefined</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  The accent color of the button
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">invert</td>
                <td className="px-4 py-3 text-sm text-gray-500">boolean</td>
                <td className="px-4 py-3 text-sm text-gray-500">false</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  Whether to invert the button colors
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">invertAccent</td>
                <td className="px-4 py-3 text-sm text-gray-500">boolean</td>
                <td className="px-4 py-3 text-sm text-gray-500">false</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  Whether to invert the accent colors
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">asChild</td>
                <td className="px-4 py-3 text-sm text-gray-500">boolean</td>
                <td className="px-4 py-3 text-sm text-gray-500">false</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  Whether to merge props with child element
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">LeadingIcon</td>
                <td className="px-4 py-3 text-sm text-gray-500">LucideIcon</td>
                <td className="px-4 py-3 text-sm text-gray-500">undefined</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  Icon to display before the button text
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">TrailingIcon</td>
                <td className="px-4 py-3 text-sm text-gray-500">LucideIcon</td>
                <td className="px-4 py-3 text-sm text-gray-500">undefined</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  Icon to display after the button text
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">loading</td>
                <td className="px-4 py-3 text-sm text-gray-500">boolean</td>
                <td className="px-4 py-3 text-sm text-gray-500">false</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  Whether the button is in a loading state
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">description</td>
                <td className="px-4 py-3 text-sm text-gray-500">string</td>
                <td className="px-4 py-3 text-sm text-gray-500">undefined</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  Description for screen readers
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border bg-gray-50 p-6">
          <Button
            variant={Variant.PRIMARY}
            size={Size.MD}
            icon={false}
            rounded={false}
            shadow={Shadow.MD}
            accent={Accent.SUCCESS}
            invert={false}
            invertAccent
            asChild={false}
            LeadingIcon={Save}
            TrailingIcon={ArrowRight}
            loading={false}
            disabled={false}
            description="Save the current document"
            aria-label="Save document"
            onClick={() => toast.success('Button clicked')}
          >
            Save Document
          </Button>
        </div>
        <CodeBlock
          code={`import { Button, ButtonGroup, ButtonProps } from "@/components/ui/button"
import { Accent, Orientation, Shadow, Size, Variant } from "@/components/ui/button/enums"

// Example of using all props
<Button
  variant={Variant.PRIMARY}
  size={Size.MD}
  icon={false}
  rounded={false}
  shadow={Shadow.MD}
  accent={Accent.SUCCESS}
  invert={false}
  invertAccent
  asChild={false}
  LeadingIcon={Save}
  TrailingIcon={ArrowRight}
  loading={false}
  disabled={false}
  description="Save the current document"
  aria-label="Save document"
  onClick={handleSave}
>
  Save Document
</Button>

// ButtonGroup props
<ButtonGroup
  aria-label="Document actions"
  orientation={Orientation.HORIZONTAL}
>
  {/* Button children */}
</ButtonGroup>`}
        />
      </section>
    </div>
  );
};

export default ButtonsView;

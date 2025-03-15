'use client';

import React, { useEffect, useState } from 'react';

import { ArrowRight, CheckCircle } from 'lucide-react';

import { toast } from 'sonner';

import { Button, ButtonGroup } from '@/components/intuitive/(native)/button';
import {
  Orientation,
  Shadow,
  Size,
  Variant,
} from '@/components/intuitive/(native)/enums';

export function ButtonsView() {
  // changing loading state every 1 second
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setLoading((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 text-2xl font-bold">Button Component Showcase</h1>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {/* Size Variants */}
        <section className="space-y-6">
          <div className="border-b pb-2">
            <h2 className="text-xl font-bold">Size Variants</h2>
            <p className="text-sm text-gray-500">
              Button sizes from smallest (3XS) to largest (3XL)
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Button
                size={Size.XXXS}
                TrailingIcon={ArrowRight}
                onClick={() => toast.success('Clicked 3XS Button')}
              >
                3XS Size
              </Button>
              <span className="text-xs text-gray-500">24px height</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size={Size.XXS}
                TrailingIcon={ArrowRight}
                onClick={() => toast.success('Clicked 2XS Button')}
              >
                2XS Size
              </Button>
              <span className="text-xs text-gray-500">28px height</span>
            </div>

            <div className="flex items-center gap-2">
              <Button size={Size.XS} TrailingIcon={ArrowRight}>
                XS Size
              </Button>
              <span className="text-xs text-gray-500">32px height</span>
            </div>

            <div className="flex items-center gap-2">
              <Button size={Size.SM} TrailingIcon={ArrowRight}>
                SM Size
              </Button>
              <span className="text-xs text-gray-500">36px height</span>
            </div>

            <div className="flex items-center gap-2">
              <Button size={Size.MD} TrailingIcon={ArrowRight}>
                MD Size (Default)
              </Button>
              <span className="text-xs text-gray-500">40px height</span>
            </div>

            <div className="flex items-center gap-2">
              <Button size={Size.LG} TrailingIcon={ArrowRight}>
                LG Size
              </Button>
              <span className="text-xs text-gray-500">44px height</span>
            </div>

            <div className="flex items-center gap-2">
              <Button size={Size.XL} TrailingIcon={ArrowRight}>
                XL Size
              </Button>
              <span className="text-xs text-gray-500">48px height</span>
            </div>

            <div className="flex items-center gap-2">
              <Button size={Size.XXL} TrailingIcon={ArrowRight}>
                2XL Size
              </Button>
              <span className="text-xs text-gray-500">52px height</span>
            </div>

            <div className="flex items-center gap-2">
              <Button size={Size.XXXL} TrailingIcon={ArrowRight}>
                3XL Size
              </Button>
              <span className="text-xs text-gray-500">56px height</span>
            </div>
          </div>
        </section>

        {/* Icon Buttons */}
        <section className="space-y-6">
          <div className="border-b pb-2">
            <h2 className="text-xl font-bold">Icon-Only Buttons</h2>
            <p className="text-sm text-gray-500">
              Square buttons with responsive sizing
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col items-center gap-1">
              <Button
                size={Size.XXXS}
                icon
                aria-label="3XS Size Icon Button"
                loading={loading}
              >
                <ArrowRight />
              </Button>
              <span className="text-xs text-gray-500">3XS (24px)</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <Button
                size={Size.XXS}
                icon
                aria-label="2XS Size Icon Button"
                loading={loading}
              >
                <ArrowRight />
              </Button>
              <span className="text-xs text-gray-500">2XS (28px)</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <Button
                size={Size.XS}
                icon
                aria-label="XS Size Icon Button"
                loading={loading}
              >
                <ArrowRight />
              </Button>
              <span className="text-xs text-gray-500">XS (32px)</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <Button
                size={Size.SM}
                icon
                aria-label="SM Size Icon Button"
                loading={loading}
              >
                <ArrowRight />
              </Button>
              <span className="text-xs text-gray-500">SM (36px)</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <Button
                size={Size.MD}
                icon
                aria-label="MD Size Icon Button"
                loading={loading}
              >
                <ArrowRight />
              </Button>
              <span className="text-xs text-gray-500">MD (40px)</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <Button
                size={Size.LG}
                icon
                aria-label="LG Size Icon Button"
                loading={loading}
              >
                <ArrowRight />
              </Button>
              <span className="text-xs text-gray-500">LG (44px)</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <Button
                size={Size.XL}
                icon
                aria-label="XL Size Icon Button"
                loading={loading}
              >
                <ArrowRight />
              </Button>
              <span className="text-xs text-gray-500">XL (48px)</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <Button
                size={Size.XXL}
                icon
                aria-label="2XL Size Icon Button"
                loading={loading}
              >
                <ArrowRight />
              </Button>
              <span className="text-xs text-gray-500">2XL (52px)</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <Button
                size={Size.XXXL}
                icon
                aria-label="3XL Size Icon Button"
                loading={loading}
              >
                <ArrowRight />
              </Button>
              <span className="text-xs text-gray-500">3XL (56px)</span>
            </div>
          </div>
        </section>

        {/* Button Variants */}
        <section className="space-y-6">
          <div className="border-b pb-2">
            <h2 className="text-xl font-bold">Style Variants</h2>
            <p className="text-sm text-gray-500">
              Different visual styles for different use cases
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Button variant={Variant.PRIMARY}>Primary</Button>
              <span className="text-xs text-gray-500">
                Default, used for primary actions
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <Button variant={Variant.SECONDARY}>Secondary</Button>
              <span className="text-xs text-gray-500">
                Used for secondary actions
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <Button variant={Variant.ACCENT}>Accent</Button>
              <span className="text-xs text-gray-500">
                Used for highlighting actions
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <Button variant={Variant.DESTRUCTIVE}>Destructive</Button>
              <span className="text-xs text-gray-500">
                For dangerous actions like delete
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <Button variant={Variant.SUCCESS}>Success</Button>
              <span className="text-xs text-gray-500">
                For successful actions
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <Button variant={Variant.WARNING}>Warning</Button>
              <span className="text-xs text-gray-500">
                For cautionary actions
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <Button variant={Variant.GHOST}>Ghost</Button>
              <span className="text-xs text-gray-500">
                Low emphasis, background only on hover
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <Button variant={Variant.LINK}>Link</Button>
              <span className="text-xs text-gray-500">
                Appears as a text link
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <Button variant={Variant.OUTLINE}>Outline</Button>
              <span className="text-xs text-gray-500">Bordered version</span>
            </div>
          </div>
        </section>

        {/* Shadows */}
        <section className="space-y-6">
          <div className="border-b pb-2">
            <h2 className="text-xl font-bold">Shadow Variants</h2>
            <p className="text-sm text-gray-500">
              Different shadow depths for elevation
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Button shadow={Shadow.SM}>Small Shadow</Button>
              <span className="text-xs text-gray-500">Subtle elevation</span>
            </div>

            <div className="flex flex-col gap-1">
              <Button shadow={Shadow.MD}>Medium Shadow</Button>
              <span className="text-xs text-gray-500">Medium elevation</span>
            </div>

            <div className="flex flex-col gap-1">
              <Button shadow={Shadow.LG}>Large Shadow</Button>
              <span className="text-xs text-gray-500">Maximum elevation</span>
            </div>
          </div>
        </section>

        {/* Button States */}
        <section className="space-y-6">
          <div className="border-b pb-2">
            <h2 className="text-xl font-bold">Button States</h2>
            <p className="text-sm text-gray-500">
              Different interaction states
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Button disabled>Disabled Button</Button>
              <span className="text-xs text-gray-500">
                50% opacity, no interactions
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <Button loading>Loading Button</Button>
              <span className="text-xs text-gray-500">
                Shows spinner, disabled
              </span>
            </div>
          </div>
        </section>

        {/* Button with Icons */}
        <section className="space-y-6">
          <div className="border-b pb-2">
            <h2 className="text-xl font-bold">Icon Placement</h2>
            <p className="text-sm text-gray-500">
              Buttons with leading and trailing icons
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Button LeadingIcon={ArrowRight}>Leading Icon</Button>
              <span className="text-xs text-gray-500">Icon before text</span>
            </div>

            <div className="flex flex-col gap-1">
              <Button TrailingIcon={ArrowRight}>Trailing Icon</Button>
              <span className="text-xs text-gray-500">Icon after text</span>
            </div>

            <div className="flex flex-col gap-1">
              <Button LeadingIcon={CheckCircle} TrailingIcon={ArrowRight}>
                Both Icons
              </Button>
              <span className="text-xs text-gray-500">Icons on both sides</span>
            </div>
          </div>
        </section>

        {/* Button Group */}
        <section className="space-y-6">
          <div className="border-b pb-2">
            <h2 className="text-xl font-bold">Button Groups</h2>
            <p className="text-sm text-gray-500">
              Related buttons grouped together
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-1">
              <ButtonGroup aria-label="Horizontal Button Group">
                <Button variant={Variant.OUTLINE}>Cancel</Button>
                <Button variant={Variant.PRIMARY}>Save</Button>
                <Button variant={Variant.SUCCESS}>Publish</Button>
              </ButtonGroup>
              <span className="text-xs text-gray-500">
                Horizontal orientation (default)
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <ButtonGroup
                aria-label="Vertical Button Group"
                orientation={Orientation.VERTICAL}
              >
                <Button variant={Variant.OUTLINE}>Cancel</Button>
                <Button variant={Variant.PRIMARY}>Save</Button>
                <Button variant={Variant.SUCCESS}>Publish</Button>
              </ButtonGroup>
              <span className="text-xs text-gray-500">
                Vertical orientation
              </span>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="border-b pb-2">
            <h2 className="text-xl font-bold">Documentation</h2>
            <p className="text-sm text-gray-500">Developer resources</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded bg-gray-100 p-4">
              <h3 className="font-medium">Component API</h3>
              <p className="mt-1 text-sm">Key props overview:</p>
              <ul className="mt-2 list-inside list-disc text-sm">
                <li>
                  <code className="rounded bg-gray-200 px-1 py-0.5 text-xs">
                    size
                  </code>{' '}
                  - Button dimensions (XXXS to XXXL)
                </li>
                <li>
                  <code className="rounded bg-gray-200 px-1 py-0.5 text-xs">
                    rounded
                  </code>{' '}
                  - Fully rounded button
                </li>
                <li>
                  <code className="rounded bg-gray-200 px-1 py-0.5 text-xs">
                    variant
                  </code>{' '}
                  - Visual style
                </li>
                <li>
                  <code className="rounded bg-gray-200 px-1 py-0.5 text-xs">
                    icon
                  </code>{' '}
                  - Icon-only mode
                </li>
                <li>
                  <code className="rounded bg-gray-200 px-1 py-0.5 text-xs">
                    loading
                  </code>{' '}
                  - Loading state
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

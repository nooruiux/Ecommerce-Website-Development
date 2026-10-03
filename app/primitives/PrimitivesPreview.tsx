"use client";

import { useState } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Checkbox, Radio, Toggle } from "@/components/ui/Choice";
import { Chip } from "@/components/ui/Chip";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { PriceTag } from "@/components/ui/PriceTag";
import { ProductCard } from "@/components/ui/ProductCard";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { products } from "@/data/products";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-6 border-b border-line py-10">
      <h2 className="text-h5 font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export function PrimitivesPreview() {
  const [qty, setQty] = useState(1);
  const [on, setOn] = useState(true);
  return (
    <main className="container-page py-10">
      <h1 className="text-h1 font-bold">Primitives</h1>

      <Section title="Typography">
        <p className="font-heading text-h1 font-bold">H1 Bold 56/64</p>
        <p className="font-heading text-h2 font-semibold">H2 SemiBold 48/56</p>
        <p className="font-heading text-h3 font-semibold">H3 SemiBold 40/48</p>
        <p className="font-heading text-h4 font-semibold">H4 SemiBold 32/40</p>
        <p className="font-heading text-h5 font-medium">H5 Medium 24/32</p>
        <p className="font-heading text-h6 font-medium">H6 Medium 20/28</p>
        <p className="text-body-xl">
          Body XL 18/30 — The purpose of skin is to protect the human body.
        </p>
        <p className="text-body-lg">
          Body L 16/28 — The purpose of skin is to protect the human body.
        </p>
        <p className="text-body-md">
          Body M 14/26 — The purpose of skin is to protect the human body.
        </p>
        <p className="text-body-sm">
          Body S 12/20 — The purpose of skin is to protect the human body.
        </p>
        <p className="font-sans text-paragraph text-text-placeholder">
          Open Sans 16 — Search your products.....
        </p>
      </Section>

      <Section title="Colors">
        <div className="flex flex-wrap gap-4">
          {[
            ["primary", "bg-primary"],
            ["primary-light", "bg-primary-light"],
            ["primary-hover", "bg-primary-hover"],
            ["secondary", "bg-secondary"],
            ["accent", "bg-accent"],
            ["highlight", "bg-highlight"],
            ["success", "bg-success"],
            ["error", "bg-error"],
            ["warning", "bg-warning"],
            ["gray-20", "bg-gray-20"],
            ["gray-60", "bg-gray-60"],
            ["gray-100", "bg-gray-100"],
          ].map(([name, cls]) => (
            <div key={name} className="flex flex-col gap-2">
              <span className={`size-20 rounded-sm border border-border ${cls}`} />
              <span className="text-body-sm">{name}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Buttons">
        {(["solid", "tint", "outline", "ghost"] as const).map((variant) => (
          <div key={variant} className="flex flex-wrap items-center gap-4">
            <Button variant={variant} size="lg">
              Get Started
            </Button>
            <Button variant={variant} size="md">
              Submit
            </Button>
            <Button variant={variant} size="sm">
              View All
            </Button>
            <Button variant={variant} disabled>
              Disabled
            </Button>
            <Button variant={variant} loading>
              Loading
            </Button>
          </div>
        ))}
        <div>
          <ButtonLink href="/" variant="solid">
            Link button
          </ButtonLink>
        </div>
      </Section>

      <Section title="Form fields">
        <div className="grid max-w-[29.5rem] gap-4">
          <Input label="Name" placeholder="Jams Keates" />
          <Input
            label="Email"
            type="email"
            placeholder="Jams@gmail.com"
            error="Enter a valid email address"
            defaultValue="jams@"
          />
          <Input label="Phone" placeholder="+982-2762 27266" disabled />
          <Textarea label="Message" placeholder="I would like to talk you......" />
          <Select label="Sort by" defaultValue="featured">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
          </Select>
        </div>
      </Section>

      <Section title="Controls and chips">
        <div className="flex flex-wrap items-center gap-6">
          <Checkbox label="Checkbox" defaultChecked />
          <Checkbox label="Unchecked" />
          <Radio name="r" label="Radio" defaultChecked />
          <Radio name="r" label="Option" />
          <Toggle checked={on} onChange={setOn} label="Toggle" />
          <QuantityStepper value={qty} onChange={setQty} />
        </div>
        <div className="flex flex-wrap gap-4">
          <Chip tone="success">Success</Chip>
          <Chip tone="failed">Failed</Chip>
          <Chip tone="pending">Pending</Chip>
          <Chip tone="refund">Refund</Chip>
          <Chip tone="unpaid">Unpaid</Chip>
        </div>
        <div className="flex gap-6">
          <PriceTag price={5.75} />
          <PriceTag price={12} salePrice={9.6} />
          <PriceTag price={12} size="lg" />
        </div>
      </Section>

      <Section title="Product card + skeleton">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </div>
      </Section>
    </main>
  );
}

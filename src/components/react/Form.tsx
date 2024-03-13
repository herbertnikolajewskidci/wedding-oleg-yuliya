"use client";

import { Toaster } from "@/components/ui/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "../ui/checkbox";

const FormSchema = z.object({
    gaeste: z.string().min(2, {
        message: "Bitte gib mindestens einen Namen an.",
    }),
    brauchtUnterkunft: z.boolean(),
    schnitzel: z.string().min(0),
    schweinebraten: z.string().min(0),
    haehnchen: z.string().min(0),
    haehnchenSchnitzel: z.string().min(0),
    "do-so": z.boolean(),
    "fr-so": z.boolean(),
    "sa-so": z.boolean(),
});

export function InputForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            gaeste: "",
            brauchtUnterkunft: false,
            "do-so": false,
            "fr-so": false,
            "sa-so": false,
            schnitzel: String("0"),
            haehnchenSchnitzel: String("0"),
            schweinebraten: String("0"),
            haehnchen: String("0"),
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        await fetch("/api/send", {
            method: "POST",
            body: JSON.stringify(data),
        });
        toast({
            title: "Danke, dass Du Bescheid gegeben hast! Wir haben folgende Nachricht erhalten.",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });
        form.reset();
    }

    const gerichte = [
        {
            name: "Schnitzel vom Schwein",
            imgSrc: "/schnitzel.jpeg",
            label: "schnitzel",
        },
        {
            name: (
                <span>
                    Schweinebra<span className="min-[306px]:hidden">-</span>
                    ten mit Knödel
                </span>
            ),
            imgSrc: "/schweinebraten.jpeg",
            label: "schweinebraten",
        },
        {
            name: (
                <span>
                    Hähnchen<span className="min-[321px]:hidden">-</span>
                    schenkel
                </span>
            ),
            imgSrc: "/haehnchen.jpeg",
            label: "haehnchen",
        },
        {
            name: (
                <span>
                    Hähnchen<span className="min-[321px]:hidden">-</span>
                    schnitzel
                </span>
            ),
            imgSrc: "/haehnchenschnitzel.webp",
            label: "haehnchenSchnitzel",
        },
    ];

    const uebernachtungsMoeglichkeiten = [
        { name: "do-so", day: "Donnerstag" },
        { name: "fr-so", day: "Freitag" },
        { name: "sa-so", day: "Samstag" },
    ];

    const item = {
        label: "Gasthaus",
        name: "Gasthof%20Beim%30Butz",
        hausnummer: "3",
        strasse: "Kirchplatz",
        plz: "93086",
        ort: "Wörth an der Donau",
    };

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div>
                        <FormField
                            control={form.control}
                            name="gaeste"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Name bzw. Familie..."
                                            {...field}
                                            className="bg-accent placeholder:text-accent-foreground"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        {gerichte.map((gericht, index) => (
                            <FormField
                                key={index}
                                control={form.control}
                                name={
                                    gericht.label as
                                        | "schnitzel"
                                        | "schweinebraten"
                                        | "haehnchen"
                                        | "haehnchenSchnitzel"
                                }
                                render={({ field }) => (
                                    <FormItem className="flex justify-between items-center gap-4 flex-nowrap break-words">
                                        <img
                                            src={gericht.imgSrc}
                                            alt={gericht.label}
                                            className="size-7 min-[340px]:size-14 sm:size-28 rounded-lg object-cover"
                                        />
                                        <FormLabel className="text-md">
                                            {gericht.name}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="tel"
                                                placeholder="0"
                                                {...field}
                                                className="bg-accent placeholder:text-accent-foreground size-10 min-[340px]:size-14 rounded-lg pl-3"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>

                    <div>
                        <FormField
                            control={form.control}
                            name="brauchtUnterkunft"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="w-8 h-8 bg-accent placeholder:text-accent-foreground"
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="font-bold peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Ich benötige eine Übernachtungs
                                            <span className="min-[303px]:hidden">
                                                -
                                            </span>
                                            möglichkeit
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    {form.getValues().brauchtUnterkunft && (
                        <div className="flex flex-col md:flex-row  md:items-center">
                            <div className="pb-8 md:pr-4 md:w-[66.66%] md:pb-0 w-full bg-img-anfahrt">
                                <iframe
                                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2617.5501121337443!2d12.397395476511548!3d49.00011837135164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479fde4adcff9a0f%3A0xaf2cf539017d3cc9!2sGasthof%20Beim%20Butz!5e0!3m2!1sde!2sde!4v1710364014235!5m2!1sde!2sde`}
                                    width="100%"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                {uebernachtungsMoeglichkeiten.map(
                                    (day, index) => (
                                        <FormField
                                            key={index}
                                            control={form.control}
                                            name={
                                                day.name as
                                                    | "do-so"
                                                    | "fr-so"
                                                    | "sa-so"
                                            }
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={
                                                                field.value
                                                            }
                                                            onCheckedChange={
                                                                field.onChange
                                                            }
                                                            className="w-8 h-8 bg-accent placeholder:text-accent-foreground"
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                            von {day.day} bis
                                                            Sonntag
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    )}
                    <div className="flex justify-center">
                        <Button
                            className="w-96 bg-accent text-accent-foreground"
                            type="submit"
                        >
                            Senden
                        </Button>
                    </div>
                </form>
            </Form>
            <Toaster />
        </>
    );
}

// To Do: H#hnchen-Schnitzel hinzufügen, Beilagen unten hinzufügen,

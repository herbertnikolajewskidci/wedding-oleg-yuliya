"use client";

import { Toaster } from "@/components/ui/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
});

export function InputForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            gaeste: "",
            brauchtUnterkunft: false,
            schnitzel: String("0"),
            schweinebraten: String("0"),
            haehnchen: String("0"),
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "Danke, dass Du bescheid gegeben hast! Wir haben folgende Nachricht erhalten.",
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
            name: "Schnitzel mit Pommes",
            imgSrc: "/schnitzel.jpeg",
            label: "schnitzel",
        },
        {
            name: "Schweinebraten mit Knödel",
            imgSrc: "/schweinebraten.jpeg",
            label: "schweinebraten",
        },
        {
            name: "Hähnchenschenkel",
            imgSrc: "/haehnchen.jpeg",
            label: "haehnchen",
        },
    ];

    // const [bestellungen, setBestellungen] = useState([
    //     { name: "Schnitzel mit Pommes", anzahl: 0 },
    //     { name: "Schweinebraten mit Knödel", anzahl: 0 },
    //     { name: "Hähnchenschenkel", anzahl: 0 },
    // ]);

    // const handleAnzahlAendern = (index: number, anzahl: number) => {
    //     const neueBestellungen = [...bestellungen];
    //     neueBestellungen[index].anzahl = anzahl;
    //     setBestellungen(neueBestellungen);
    // };

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
                                            Ich benötige eine
                                            Übernachtungsmöglichkeit
                                        </FormLabel>
                                    </div>
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
                                }
                                render={({ field }) => (
                                    <FormItem className="flex justify-between items-center gap-4 flex-nowrap break-words">
                                        <img
                                            src={gericht.imgSrc}
                                            alt={gericht.name}
                                            className="w-28 h-28 rounded-lg object-cover"
                                        />
                                        <FormLabel className="text-md">
                                            {gericht.name}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="tel"
                                                placeholder="0"
                                                {...field}
                                                // onChange={(e) =>
                                                //     handleAnzahlAendern(
                                                //         index,
                                                //         Number(e.target.value)
                                                //     )
                                                // }
                                                className="bg-accent placeholder:text-accent-foreground w-14 h-14 rounded-lg pl-3"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>
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

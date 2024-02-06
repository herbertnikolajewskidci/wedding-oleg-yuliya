"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@radix-ui/react-label";
import { Check } from "lucide-react";

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Bitte gib mindestens einen Namen an.",
    }),
    unterkunft: z.boolean(),
});

export function InputForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            unterkunft: false,
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });
    }

    const gerichte = [
        { name: "Schnitzel mit Pommes", imgSrc: "/schnitzel.jpeg" },
        { name: "Schweinebraten mit Knödel", imgSrc: "/schweinebraten.jpeg" },
        { name: "Hähnchenschenkel", imgSrc: "/haehnchen.jpeg" },
    ];

    const [bestellungen, setBestellungen] = useState("");

    const handleAnzahlAendern = (index: number, anzahl: number) => {
        const neueBestellungen = [...bestellungen];
        neueBestellungen[index] = anzahl;
        setBestellungen(neueBestellungen);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Name bzw. Familie..."
                                        {...field}
                                        className="bg-white"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    {gerichte.map((gericht, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center gap-4 flex-nowrap break-words"
                        >
                            <img
                                src={gericht.imgSrc}
                                alt={gericht.name}
                                className="w-28 h-28 rounded-lg object-cover"
                            />
                            <label className="text-lg">{gericht.name}</label>
                            <input
                                type="tel"
                                className="w-14 h-14 rounded-lg pl-3"
                                value={bestellungen[index]}
                                placeholder="0"
                                onChange={(e) =>
                                    handleAnzahlAendern(
                                        index,
                                        Number(e.target.value)
                                    )
                                }
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Button className="w-100" type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
}

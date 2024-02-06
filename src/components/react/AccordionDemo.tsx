import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionDemo() {
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>Was sollen wir schenken?</AccordionTrigger>
                <AccordionContent>Am besten Geld!</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>
                    Gibt es eine Geschenkeliste?
                </AccordionTrigger>
                <AccordionContent>
                    Nein. Bitte schenkt uns Geld! Danke!
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>
                    Ich essen kein Fleisch. Muss ich verhungern?
                </AccordionTrigger>
                <AccordionContent>
                    Für vegetarisches Essen ist gesorgt und es gibt noch sehr
                    viele verschiedene Beilagen.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

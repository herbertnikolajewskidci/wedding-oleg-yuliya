import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionFAQ() {
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
            <AccordionItem value="item-4">
                <AccordionTrigger>
                    Ich benötige eine Übernachtungsmöglichkeit. Wo kann ich ein
                    Hotel oder Gasthaus in der nähe finden?
                </AccordionTrigger>
                <AccordionContent>
                    Wir werden für alle, welche eine Übernachtungsmöglichkeit
                    benötigen, ein Hotelzimmer in der nähe buchen. Bitte teilt
                    uns{" "}
                    <a className="underline font-bold" href="#rueckmeldung">
                        hier
                    </a>{" "}
                    mit, ob ihr eine Übernachtungsmöglichkeit benötigt. Wir
                    buchen bei folgendem Gasthaus:{" "}
                    <a href="https://www.beim-butz.de/">
                        https://www.beim-butz.de/
                    </a>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

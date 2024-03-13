import * as React from "react";

interface EmailTemplateProps {
    gaeste: string;
    brauchtUnterkunft: boolean;
    schnitzel: string;
    schweinebraten: string;
    haehnchen: string;
    haehnchenSchnitzel: string;
    "do-so": boolean;
    "fr-so": boolean;
    "sa-so": boolean;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    gaeste,
    brauchtUnterkunft,
    schnitzel,
    schweinebraten,
    haehnchen,
    haehnchenSchnitzel,
    "do-so": doSo,
    "fr-so": frSo,
    "sa-so": saSo,
}) => (
    <div>
        <h1>Zusage von {gaeste}</h1>
        <p>
            Folgende Gäste haben zugesagt: <strong>{gaeste}</strong> und
            benötigen <strong>{brauchtUnterkunft ? "eine" : "keine"}</strong>{" "}
            Unterkunft.{" "}
            {brauchtUnterkunft && (
                <p>
                    Es wird eine Unterkunft für{" "}
                    {
                        <strong>
                            {doSo ? `Do-So` : frSo ? `Fr-So` : `Sa-So`}
                        </strong>
                    }{" "}
                    benötigt.
                </p>
            )}
        </p>
        <p>Folgende Hauptspeisen wurden bestellt: </p>
        <ul>
            {schnitzel !== "0" && <li>Schweineschnitzel: {schnitzel}</li>}
            {schweinebraten !== "0" && (
                <li>Schweinebraten: {schweinebraten}</li>
            )}
            {haehnchen !== "0" && <li>Hähnchen: {haehnchen}</li>}
            {haehnchenSchnitzel !== "0" && (
                <li>Hähnchenschnitzel: {haehnchenSchnitzel}</li>
            )}
        </ul>
    </div>
);

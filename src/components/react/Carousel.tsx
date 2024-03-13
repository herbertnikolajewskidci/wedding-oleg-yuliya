import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

export function CostumCarousel() {
    const plugin = React.useRef(Autoplay({ delay: 3000 }));

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full h-[50vh] md:h-svh"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {Array.from({ length: 4 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="">
                            <Card>
                                <CardContent
                                    className={` h-[50vh] w-full bg-no-repeat bg-cover bg-center md:h-svh md:bg-contain`}
                                    style={{
                                        backgroundImage: `url('/image${index}.webp')`,
                                    }}
                                ></CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}

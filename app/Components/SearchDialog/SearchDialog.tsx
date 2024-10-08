"use client";
import { useGlobalContext, useGlobalContextUpdate } from '@/app/context/globalContext';
import { commandIcon } from '@/app/utils/Icons';
import { Button } from '@/components/ui/button';
import { Command, CommandInput } from '@/components/ui/command';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Search } from 'lucide-react';
import React from 'react'

function SearchDialog() {
    const { geoCodedList, inputValue, handleInput } = useGlobalContext();
    const { setActiveCityCoords } = useGlobalContextUpdate();

    const getClickedCoords = (lat: number, lon: number) => {
        setActiveCityCoords([lat, lon]);
    };

    return (
        <div className='search-btn'>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="border inline-flex items-center justify-center text-sm font-medium 
                        hover:dark:bg-[#131313] hover:bg-slate-100  ease-in-out duration-200"
                    >
                        <p className="text-sm text-muted-foreground">Search Here...</p>
                        <div className="command dark:bg-[#262626] bg-slate-200  py-[2px] pl-[5px] pr-[7px] 
                        rounded-sm ml-[10rem] flex items-center gap-2">
                            {commandIcon}
                            <span className="text-[9px]">F</span>
                        </div>
                    </Button>
                </DialogTrigger>
                <DialogContent className='p-0'>
                    <Command className='rounded-lg border shadow-md'>
                        <div className="p-3 flex h-11 w-full bg-transparent py-3 text-sm outline-none 
                                        placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 gap-2 border-b-2">
                            <Search className="mt-0.5 h-4 w-4 shrink-0 opacity-50" />
                            <input
                                className="flex mt-0.5 h-4 w-full bg-transparent text-sm outline-none 
                                placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                                value={inputValue}
                                onChangeCapture={handleInput}
                                placeholder='Type a command or search...' />
                        </div>
                        <ul className='px-3 pb-2'>
                            <p className='p-2 text-sm text-muted-foreground'>Suggestions</p>
                            {geoCodedList.length === 0 && <p>No Results</p>}

                            {geoCodedList.map((item: {
                                name: string;
                                country: string;
                                state: string;
                                lat: number,
                                lon: number
                            }, index: number) => {
                                const { country, state, name } = item
                                return (
                                    <li
                                        key={index}
                                        className="py-3 px-2 text-sm rounded-sm cursor-defaul hover:bg-accent"
                                        onClick={() => {
                                            getClickedCoords(
                                                item.lat,
                                                item.lon
                                            );
                                        }}
                                    >
                                        <p className="text">
                                            {name}, {state && state + ","}, {country}
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                    </Command>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default SearchDialog
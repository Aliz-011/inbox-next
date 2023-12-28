'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import axios from 'axios';
import { ChevronDown, FileType2, Link2, PenSquare } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const MailForm = () => {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Untitled
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <FileType2 className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
              Mail Type
            </div>
          </div>
        </div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0 items-center">
          <span className="hidden sm:block">
            <Button type="button" variant="outline">
              <PenSquare
                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Edit
            </Button>
          </span>

          <span className="ml-3 hidden sm:block">
            <Button type="button" variant="outline">
              <Link2
                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              View
            </Button>
          </span>

          <span className="sm:ml-3">
            <Button type="button">Create</Button>
          </span>

          <div className="relative ml-3 sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
                More
                <ChevronDown className="-mr-1 ml-1.5 h-5 w-5 text-gray-400" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>View</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* form */}
    </>
  );
};

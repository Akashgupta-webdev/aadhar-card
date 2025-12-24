import React, { useState } from 'react';
import { Search, Filter, ExternalLink, Building2, FileText, Globe, CreditCard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const GOVERNMENT_LINKS = [
  {
    id: 1,
    title: 'Aadhaar Card (UIDAI)',
    description: 'Official portal for Aadhaar enrollment, updates, and downloads.',
    url: 'https://uidai.gov.in/',
    category: 'Identity',
    image: '/assets/gov-icons/aadhaar.png',
    color: 'bg-orange-50',
  },
  {
    id: 2,
    title: 'National Portal of India',
    description: 'Single window access to information and services being provided by the Indian Government.',
    url: 'https://www.india.gov.in/',
    category: 'General',
    image: '/assets/gov-icons/national.png',
    color: 'bg-blue-50',
  },
  {
    id: 3,
    title: 'Ration Card (NFSA)',
    description: 'National Food Security Act portal for ration card details and food grain distribution.',
    url: 'https://nfsa.gov.in/',
    category: 'Social Security',
    image: '/assets/gov-icons/ration.png',
    color: 'bg-green-50',
  },
  {
    id: 4,
    title: 'PAN Card (Income Tax)',
    description: 'Apply for new PAN card, corrections, and link Aadhaar with PAN.',
    url: 'https://www.incometax.gov.in/iec/foportal/',
    category: 'Finance',
    image: '/assets/gov-icons/pan.png',
    color: 'bg-sky-50',
  },
  {
    id: 5,
    title: 'Voter ID (ECI)',
    description: 'Election Commission of India portal for voter registration and electoral roll search.',
    url: 'https://voters.eci.gov.in/',
    category: 'Identity',
    image: null, // Fallback to icon
    icon: <FileText className="h-10 w-10 text-blue-600" />,
    color: 'bg-indigo-50',
  },
  {
    id: 6,
    title: 'Passport Seva',
    description: 'Online Passport Seva for new passport application and renewal.',
    url: 'https://www.passportindia.gov.in/',
    category: 'Travel',
    image: null, // Fallback to icon
    icon: <Globe className="h-10 w-10 text-blue-800" />,
    color: 'bg-blue-50',
  },
  {
    id: 7,
    title: 'DigiLocker',
    description: 'Digital wallet to access authentic digital documents.',
    url: 'https://www.digilocker.gov.in/',
    category: 'General',
    image: null,
    icon: <CreditCard className="h-10 w-10 text-purple-600" />,
    color: 'bg-purple-50',
  },
  {
    id: 8,
    title: 'PMJAY (Ayushman Bharat)',
    description: 'National Health Authority portal for Ayushman Bharat scheme.',
    url: 'https://pmjay.gov.in/',
    category: 'Health',
    image: null,
    icon: <Building2 className="h-10 w-10 text-emerald-600" />,
    color: 'bg-emerald-50',
  }
];

const CATEGORIES = ['All', 'Identity', 'General', 'Social Security', 'Finance', 'Travel', 'Health'];

export default function GovernmentLinkPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredLinks = GOVERNMENT_LINKS.filter((link) => {
    const matchesSearch = link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          link.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || link.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Government Services</h1>
          <p className="text-muted-foreground mt-1">Access essential government portals and services in one place.</p>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search services..."
              className="pl-9 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* Simple Category Filter for Mobile/Desktop */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
             {/* We can use a dropdown or just buttons. For simplicity and better UX on desktop, let's use a scrollable list of badges/buttons if many, or a dropdown. 
                 Given the requirement for "Filter feature", a dropdown is cleaner if many categories, but tabs are nicer. 
                 Let's stick to the search bar being the primary and maybe a dropdown for category if requested, but the prompt said "filter feature".
                 I'll implement a simple dropdown using standard HTML select for robustness or just map buttons if few.
                 Let's use a Select component if available, or just a native select for speed and reliability.
                 Actually, let's use the Badge as filter chips.
             */}
          </div>
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredLinks.map((link) => (
          <Card key={link.id} className="group hover:shadow-lg transition-all duration-300 border-gray-200 overflow-hidden bg-white">
            <div className={`h-32 ${link.color} flex items-center justify-center relative overflow-hidden`}>
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              {link.image ? (
                <img 
                  src={link.image} 
                  alt={link.title} 
                  className="h-20 w-20 object-contain drop-shadow-sm transform group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                   {link.icon}
                </div>
              )}
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge variant="secondary" className="mb-2 text-xs font-normal">
                  {link.category}
                </Badge>
              </div>
              <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                {link.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-2 text-sm">
                {link.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="pt-0 mt-auto">
              <Button asChild className="w-full group-hover:bg-primary/90" variant="outline">
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  Visit Website
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredLinks.length === 0 && (
        <div className="text-center py-20">
          <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No services found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter to find what you're looking for.</p>
          <Button 
            variant="link" 
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="mt-2"
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}

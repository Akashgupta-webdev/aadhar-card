import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ExternalLink,
  Star,
  Download,
  Code,
  Image as ImageIcon,
  FileText,
  Video,
  Music,
  Settings,
  Calculator,
  Calendar,
  BarChart3,
  Palette,
  Lock,
  Cloud,
  Smartphone,
  Globe,
  Database,
  Zap
} from "lucide-react";

export default function ToolsLinkPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Tools", icon: Zap, count: 24 },
    { id: "design", name: "Design", icon: Palette, count: 6 },
    { id: "development", name: "Development", icon: Code, count: 8 },
    { id: "productivity", name: "Productivity", icon: BarChart3, count: 5 },
    { id: "media", name: "Media", icon: Video, count: 3 },
    { id: "utilities", name: "Utilities", icon: Settings, count: 2 },
  ];

  const tools = [
    {
      id: 1,
      name: "Image Editor",
      description: "Compress, Resize & Edit Pictures",
      category: "media",
      image: "/images/pi-7.png",
      link: "https://image.pi7.org",
      tags: ["Passport Photo Maker", "Resize Image", "Convert Image", "Compress Image"]
    },
    {
      id: 2,
      name: "Erase.bg",
      description: "Remove Background From Images For Free",
      category: "media",
      image: "/images/bg-remove.png",
      link: "https://www.erase.bg",
      tags: ["Change Background", "Remove Background API"]
    },
    {
      id: 3,
      name: "PDF Editor",
      description: "Easy, pleasant and productive PDF editor",
      category: "utilities",
      image: "/images/pdf.png",
      link: "https://www.sejda.com",
      tags: ["Compress PDF", "Edit PDF", "Extract Pages", "Merge PDFs", "Crop PDF"]
    },
    {
      id: 4,
      name: "Cutout.Pro",
      description: "Photo Enhancer",
      category: "media",
      image: "/images/image-enhancer.png",
      link: "https://www.cutout.pro/photo-enhancer-sharpener-upscaler/upload",
      tags: ["Photo Enhancer", "Quality", "High Quality Image"]
    },
    {
      id: 5,
      name: "Photo & Signature Resize",
      description: "Photo & Signature Resize",
      category: "utilities",
      image: "/images/sign-resize.png",
      link: "https://skpancenter.co.in/resize",
      tags: ["Photo Resize", "Signature Resize", "PDF Merge"]
    },
    
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : Zap;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cyberworld Tools & Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover powerful tools and resources to boost your productivity and enhance your workflow.
          </p>
        </div>

        {/* Search Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12">
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search tools by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-6 text-lg border-2 border-gray-200 focus:border-blue-500 transition-colors rounded-2xl"
            />
          </div>
          <Button 
            className="py-6 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-colors"
            size="lg"
          >
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </div>

        {/* Categories Filter */}
        {/* <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`rounded-full px-6 py-3 transition-all ${
                  selectedCategory === category.id 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25" 
                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <IconComponent className="h-4 w-4 mr-2" />
                {category.name}
                <Badge 
                  variant="secondary" 
                  className={`ml-2 ${
                    selectedCategory === category.id 
                      ? "bg-white text-blue-600" 
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {category.count}
                </Badge>
              </Button>
            );
          })}
        </div> */}

        {/* Results Info */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            {selectedCategory === "all" ? "All Tools" : categories.find(c => c.id === selectedCategory)?.name}
            <span className="text-gray-500 text-lg font-normal ml-2">
              ({filteredTools.length} tools found)
            </span>
          </h2>
          <div className="text-sm text-gray-500">
            Sorted by: <span className="font-medium text-gray-700">Most Popular</span>
          </div>
        </div>

        {/* Tools Grid */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No tools found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => {
              const CategoryIcon = getCategoryIcon(tool.category);
              return (
                <Card 
                  key={tool.id} 
                  className={`group pt-0 hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-200 hover:scale-105 ${
                    tool.isFeatured ? "border-blue-200 shadow-lg" : "border-gray-100"
                  }`}
                >
                  <CardHeader className="p-0 relative">
                    {/* Tool Image */}
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      <img
                        src={tool.image}
                        alt={tool.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        {tool.isFeatured && (
                          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
                            Featured
                          </Badge>
                        )}
                        {tool.isNew && (
                          <Badge className="bg-green-500 text-white border-0">
                            New
                          </Badge>
                        )}
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                          <CategoryIcon className="h-3 w-3 mr-1" />
                          {categories.find(c => c.id === tool.category)?.name}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-start justify-between mb-3">
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {tool.name}
                      </CardTitle>
                    </div>
                    
                    <CardDescription className="text-gray-600 mb-4 line-clamp-3">
                      {tool.description}
                    </CardDescription>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tool.tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="text-xs text-gray-500 border-gray-200"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 transition-all group-hover:shadow-lg group-hover:shadow-blue-500/25"
                      asChild
                    >
                      <a href={tool.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Tool
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}

        {/* Load More Section */}
        {filteredTools.length > 0 && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              className="rounded-xl px-8 py-3 border-2 border-gray-200 hover:border-blue-200 hover:bg-blue-50"
              size="lg"
            >
              Load More Tools
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
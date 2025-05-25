
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Accessibility as AccessibilityIcon, Eye, CircleDot, CircleHelp } from 'lucide-react';

const ACCESSIBILITY_STORAGE_KEY = 'insta_health_accessibility_settings';

interface AccessibilitySettings {
  highContrast: boolean;
  largerText: number;
  reduceMotion: boolean;
  colorBlindMode: string | null;
  screenReader: boolean;
}

const defaultSettings: AccessibilitySettings = {
  highContrast: false,
  largerText: 100,
  reduceMotion: false,
  colorBlindMode: null,
  screenReader: false,
};

const Accessibility: React.FC = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const { toast } = useToast();

  // Load settings on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem(ACCESSIBILITY_STORAGE_KEY);
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Apply settings when they change
  useEffect(() => {
    // Apply high contrast
    if (settings.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    // Apply text size
    document.documentElement.style.fontSize = `${settings.largerText}%`;

    // Apply color blind mode
    document.documentElement.setAttribute('data-color-mode', settings.colorBlindMode || 'normal');

    // Apply reduce motion
    if (settings.reduceMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }

    // Save settings to localStorage
    localStorage.setItem(ACCESSIBILITY_STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const handleChange = (key: keyof AccessibilitySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    toast({
      title: "Settings Reset",
      description: "All accessibility settings have been reset to default.",
    });
  };

  const saveSettings = () => {
    localStorage.setItem(ACCESSIBILITY_STORAGE_KEY, JSON.stringify(settings));
    toast({
      title: "Settings Saved",
      description: "Your accessibility settings have been saved.",
    });
  };

  return (
    <div className="container my-14 py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <AccessibilityIcon className="h-8 w-8" />
        Accessibility Settings
      </h1>
      
      {/* SVG Filters for color blind modes */}
      <svg className="absolute" style={{ width: 0, height: 0, position: 'absolute' }} aria-hidden="true" focusable="false">
        {/* Protanopia Filter */}
        <defs>
          <filter id="protanopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.567, 0.433, 0, 0, 0
                      0.558, 0.442, 0, 0, 0
                      0, 0.242, 0.758, 0, 0
                      0, 0, 0, 1, 0"
            />
          </filter>
        </defs>
        
        {/* Deuteranopia Filter */}
        <defs>
          <filter id="deuteranopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.625, 0.375, 0, 0, 0
                      0.7, 0.3, 0, 0, 0
                      0, 0.3, 0.7, 0, 0
                      0, 0, 0, 1, 0"
            />
          </filter>
        </defs>
        
        {/* Tritanopia Filter */}
        <defs>
          <filter id="tritanopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.95, 0.05, 0, 0, 0
                      0, 0.433, 0.567, 0, 0
                      0, 0.475, 0.525, 0, 0
                      0, 0, 0, 1, 0"
            />
          </filter>
        </defs>
      </svg>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Visual Settings
            </CardTitle>
            <CardDescription>Adjust how content appears on screen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="high-contrast">High Contrast Mode</Label>
                <p className="text-sm text-gray-500">Increases color contrast for better readability</p>
              </div>
              <Switch 
                id="high-contrast" 
                checked={settings.highContrast} 
                onCheckedChange={(checked) => handleChange('highContrast', checked)} 
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="text-size">Text Size ({settings.largerText}%)</Label>
              </div>
              <Slider 
                id="text-size"
                min={80} 
                max={200} 
                step={10}
                value={[settings.largerText]}
                onValueChange={(value) => handleChange('largerText', value[0])}
              />
              <p className="text-sm text-gray-500">Adjust the size of text throughout the application</p>
            </div>

            <div className="space-y-4">
              <Label>Color Blind Modes</Label>
              <RadioGroup 
                value={settings.colorBlindMode || "normal"}
                onValueChange={(value) => handleChange('colorBlindMode', value === "normal" ? null : value)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal">Normal Vision</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="protanopia" id="protanopia" />
                  <Label htmlFor="protanopia">Red-Green Color Blindness (Protanopia)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="deuteranopia" id="deuteranopia" />
                  <Label htmlFor="deuteranopia">Green-Red Color Blindness (Deuteranopia)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tritanopia" id="tritanopia" />
                  <Label htmlFor="tritanopia">Blue-Yellow Color Blindness (Tritanopia)</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CircleHelp className="h-5 w-5" />
              Movement & Sound
            </CardTitle>
            <CardDescription>Adjust animation and audio settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="reduce-motion">Reduce Motion</Label>
                <p className="text-sm text-gray-500">Minimize animations and transitions</p>
              </div>
              <Switch 
                id="reduce-motion" 
                checked={settings.reduceMotion} 
                onCheckedChange={(checked) => handleChange('reduceMotion', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="screen-reader">Screen Reader Optimization</Label>
                <p className="text-sm text-gray-500">Enhances compatibility with screen readers</p>
              </div>
              <Switch 
                id="screen-reader" 
                checked={settings.screenReader} 
                onCheckedChange={(checked) => handleChange('screenReader', checked)}
              />
            </div>
            
            <div className="pt-4">
              <div className="p-4 bg-gray-50 rounded-lg mt-4">
                <h3 className="font-medium text-gray-900 flex items-center gap-2">
                  <CircleDot className="h-4 w-4" />
                  Test Your Settings
                </h3>
                <p className="text-gray-600 mt-1">
                  The text and elements on this page reflect your current accessibility settings. 
                  Adjust the settings and observe the changes in real-time.
                </p>
                
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="h-8 bg-blue-500 rounded"></div>
                  <div className="h-8 bg-green-500 rounded"></div>
                  <div className="h-8 bg-red-500 rounded"></div>
                  <div className="h-8 bg-yellow-500 rounded"></div>
                  <div className="h-8 bg-purple-500 rounded"></div>
                  <div className="h-8 bg-pink-500 rounded"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end mt-8">
        <Button variant="outline" className="mr-4" onClick={resetSettings}>
          Reset to Defaults
        </Button>
        <Button onClick={saveSettings}>
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Accessibility;

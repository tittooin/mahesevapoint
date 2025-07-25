import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import headerLogos from '@/assets/header-logos.png';
import footerLogos from '@/assets/footer-logos.png';
import heroSectionNew from '@/assets/hero-section-new.png';
import contactSection from '@/assets/contact-section.png';
import contactFooterFinal from '@/assets/contact-footer-final.png';

const Index = () => {
  const [propertyArea, setPropertyArea] = useState('Urban');
  const [licensePeriod, setLicensePeriod] = useState(12);
  const [monthlyRent, setMonthlyRent] = useState('');
  const [deposit, setDeposit] = useState('');
  const [addons, setAddons] = useState({
    homeVisit: false,
    extraVisitSame: false,
    extraVisitOut: false,
    remoteAssist: false
  });
  const [totalAmount, setTotalAmount] = useState(1999);
  const [stampDuty, setStampDuty] = useState(0);

  const calculateRent = () => {
    console.log('Calculating rent...', { monthlyRent, licensePeriod, propertyArea });
    
    const monthlyRentNum = parseFloat(monthlyRent) || 0;
    
    // Fixed charges
    const govtRegFee = 1000;
    const dhcFee = 300;
    const serviceFee = 599;

    // Calculate stamp duty (0.25% of total rent) - only if we have valid rent data
    let calculatedStampDuty = 0;
    if (monthlyRent && monthlyRentNum > 0 && licensePeriod > 0) {
      const totalRent = monthlyRentNum * licensePeriod;
      calculatedStampDuty = Math.round(totalRent * 0.0025);
    }

    // Calculate add-ons
    let addonsTotal = 0;
    if (addons.homeVisit) addonsTotal += 400;
    if (addons.extraVisitSame) addonsTotal += 500;
    if (addons.extraVisitOut) addonsTotal += 2000;
    if (addons.remoteAssist) addonsTotal += 2000;

    // Calculate total
    const total = govtRegFee + dhcFee + serviceFee + calculatedStampDuty + addonsTotal;

    setStampDuty(calculatedStampDuty);
    setTotalAmount(total);

    console.log('Calculation complete:', {
      totalRent: monthlyRentNum * licensePeriod,
      stampDuty: calculatedStampDuty,
      addonsTotal,
      total
    });
  };

  useEffect(() => {
    calculateRent();
  }, [propertyArea, licensePeriod, monthlyRent, addons]);

  const handleAddonChange = (addonKey: string, checked: boolean) => {
    setAddons(prev => ({ ...prev, [addonKey]: checked }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <nav className="bg-orange-500 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Tiro Devanagari Marathi', serif" }}>
            महाराष्ट्र ई-सेवा केंद्र
          </h1>
          <div className="hidden md:flex space-x-8 text-white">
            <a href="#" className="hover:text-orange-200 transition-colors">Home</a>
            <a href="#" className="hover:text-orange-200 transition-colors">Rent Agreement</a>
            <a href="#" className="hover:text-orange-200 transition-colors">Services</a>
            <a href="#" className="hover:text-orange-200 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">Digital Services at Your Fingertips</h1>
              <p className="text-xl text-gray-600 mb-6">Complete online platform for all your Indian citizen services. Fast, reliable, and secure digital solutions.</p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Rent Agreement
                </Button>
                <Button variant="outline" size="lg">
                  All Services
                </Button>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img 
                  src={heroSectionNew} 
                  alt="Maharashtra E-Seva Kendra - Complete Digital Services Platform with All Government Service Logos" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rent Calculator */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg">
                <h2 className="text-3xl font-bold">Rent Agreement Calculator</h2>
              </div>
              <p className="text-gray-600 text-lg mt-4">
                The Rent Agreement Calculator provides an instant estimate of property service fees, including government charges and add-ons.
              </p>
            </div>

            <Card className="shadow-xl">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label className="text-gray-700 font-semibold">Property Area</Label>
                    <Select value={propertyArea} onValueChange={setPropertyArea}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Urban">Urban</SelectItem>
                        <SelectItem value="Rural">Rural</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-gray-700 font-semibold">License Period (Months)</Label>
                    <Input
                      type="number"
                      value={licensePeriod}
                      onChange={(e) => setLicensePeriod(parseInt(e.target.value) || 0)}
                      placeholder="12"
                      min="1"
                      max="60"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-700 font-semibold">Monthly Rent (₹)</Label>
                    <Input
                      type="number"
                      value={monthlyRent}
                      onChange={(e) => setMonthlyRent(e.target.value)}
                      placeholder="10000"
                      min="1"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-700 font-semibold">Deposit (₹)</Label>
                    <Input
                      type="number"
                      value={deposit}
                      onChange={(e) => setDeposit(e.target.value)}
                      placeholder="50000"
                      min="0"
                    />
                  </div>
                </div>

                {/* Government Charges */}
                <div className="mb-6">
                  <h5 className="font-bold text-lg mb-4">Government Charges</h5>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-gray-700 font-semibold">Govt. Reg Charges</Label>
                      <div className="p-3 bg-gray-100 rounded">₹1,000</div>
                    </div>
                    <div>
                      <Label className="text-gray-700 font-semibold">Govt. DHC</Label>
                      <div className="p-3 bg-gray-100 rounded">₹300</div>
                    </div>
                    <div>
                      <Label className="text-gray-700 font-semibold">Govt. Stamp Duty</Label>
                      <div className="p-3 bg-gray-100 rounded">₹{stampDuty.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                {/* Service Charges */}
                <div className="mb-6">
                  <Label className="font-bold text-lg">Our Service Charges</Label>
                  <div className="p-3 bg-gray-100 rounded">₹599</div>
                </div>

                {/* Add-ons */}
                <div className="mb-6">
                  <h5 className="font-bold text-lg mb-4">Add Ons</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="homeVisit"
                        checked={addons.homeVisit}
                        onCheckedChange={(checked) => handleAddonChange('homeVisit', !!checked)}
                      />
                      <Label htmlFor="homeVisit">Home Visit <span className="text-green-600 font-semibold">(₹400)</span></Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="extraVisitSame"
                        checked={addons.extraVisitSame}
                        onCheckedChange={(checked) => handleAddonChange('extraVisitSame', !!checked)}
                      />
                      <Label htmlFor="extraVisitSame">Extra Visit - Same City <span className="text-green-600 font-semibold">(₹500)</span></Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="extraVisitOut"
                        checked={addons.extraVisitOut}
                        onCheckedChange={(checked) => handleAddonChange('extraVisitOut', !!checked)}
                      />
                      <Label htmlFor="extraVisitOut">Extra Visit - Out of Pune <span className="text-green-600 font-semibold">(₹2000)</span></Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remoteAssist"
                        checked={addons.remoteAssist}
                        onCheckedChange={(checked) => handleAddonChange('remoteAssist', !!checked)}
                      />
                      <Label htmlFor="remoteAssist">Remote Assistance <span className="text-green-600 font-semibold">(₹2000)</span></Label>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <Button onClick={calculateRent} size="lg" className="bg-green-600 hover:bg-green-700 px-8">
                    Calculate Total
                  </Button>
                </div>

                {/* Total Display */}
                <div className="bg-blue-500 text-white text-center py-6 rounded-lg shadow-lg">
                  <div className="text-2xl font-semibold">
                    Total Cost including Govt. Charges: ₹{totalAmount.toLocaleString()}
                  </div>
                </div>

                <div className="text-center mt-6">
                  <Button className="bg-red-600 hover:bg-red-700 px-8">
                    Contact Us
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-orange-500 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-3xl font-bold mb-6" style={{ fontFamily: "'Tiro Devanagari Marathi', serif" }}>
                Contact महाराष्ट्र ई-सेवा केंद्र
              </h3>
              <div className="space-y-4 text-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  <span>Pune, Maharashtra</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📞</span>
                  <span>Contact Available</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✉️</span>
                  <span>Email Available</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🕒</span>
                  <span>Service Hours Available</span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
                <img 
                  src={contactFooterFinal} 
                  alt="Maharashtra E-Seva Kendra - Digital India, Aadhaar, MSME Service Logos" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div>
              <Card className="bg-gray-100">
                <CardHeader>
                  <CardTitle className="text-gray-800 text-xl">Get Quick Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input 
                      placeholder="Your Name" 
                      className="bg-white border-gray-300"
                    />
                    <Input 
                      placeholder="Mobile Number" 
                      className="bg-white border-gray-300"
                    />
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-md bg-white" 
                      rows={3} 
                      placeholder="Your Message"
                    ></textarea>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg">
                      📧 Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
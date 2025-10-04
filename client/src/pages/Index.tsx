import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Textarea } from '../components/ui/textarea';
import { CheckCircle, Info } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';
import headerLogos from '../assets/header-logos.png';
import footerLogos from '../assets/footer-logos.png';
import heroSectionNew from '../assets/hero-section-new.png';
import contactSection from '../assets/contact-section.png';
import contactFooterFinal from '../assets/contact-footer-final.png';
import { Link } from "wouter";

const Index = () => {
  const { toast } = useToast();
  const [propertyArea, setPropertyArea] = useState('Urban');
  const [licensePeriod, setLicensePeriod] = useState(0);
  const [monthlyRent, setMonthlyRent] = useState('');
  const [deposit, setDeposit] = useState('');
  const [addons, setAddons] = useState({
    homeVisit: false,
    extraVisitSame: false,
    extraVisitOut: false,
    remoteAssist: false
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [stampDuty, setStampDuty] = useState(0);
  const [govtStampDutyTenPercent, setGovtStampDutyTenPercent] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    mobile: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  // Service documents data
  const serviceDocuments = {
    'aadhaar': {
      title: 'Aadhaar Card',
      documents: [
        'Original Aadhaar card or enrolment slip',
        'Proof of identity (PAN card, passport, voter ID)',
        'Proof of address (utility bill, bank statement)',
        'Photograph (passport size)',
        'Mobile number for OTP verification'
      ]
    },
    'pan': {
      title: 'PAN Card',
      documents: [
        'Form 49A (for Indian citizens) or Form 49AA (for foreign citizens)',
        'Proof of identity (Aadhaar, passport, voter ID)',
        'Proof of address (utility bill, bank statement)',
        'Proof of date of birth (birth certificate, passport)',
        'Passport size photographs'
      ]
    },
    'voter': {
      title: 'Voter ID',
      documents: [
        'Form 6 (for new registration)',
        'Age proof (birth certificate, passport, Aadhaar)',
        'Address proof (utility bill, bank statement)',
        'Identity proof (Aadhaar, PAN card, passport)',
        'Recent passport size photograph'
      ]
    },
    'driving': {
      title: 'Driving License',
      documents: [
        'Form 1 (Application for driving license)',
        'Form 1A (Medical certificate)',
        'Age proof (birth certificate, school certificate)',
        'Address proof (utility bill, Aadhaar)',
        'Passport size photographs',
        'Learning license (for permanent license)'
      ]
    },
    'passport': {
      title: 'Passport',
      documents: [
        'Online application form',
        'Birth certificate',
        'Address proof (Aadhaar, utility bill)',
        'Identity proof (Aadhaar, PAN card)',
        'Passport size photographs',
        'Police verification documents'
      ]
    },
    'income': {
      title: 'Income Certificate',
      documents: [
        'Application form with required details',
        'Salary slips or income proof',
        'Bank statements (last 6 months)',
        'Aadhaar card copy',
        'Address proof documents',
        'Affidavit of income declaration'
      ]
    },
    'caste': {
      title: 'Caste Certificate',
      documents: [
        'Application form for caste certificate',
        'Birth certificate of applicant',
        'School leaving certificate',
        'Parents caste certificate (if available)',
        'Aadhaar card copy',
        'Address proof documents'
      ]
    },
    'domicile': {
      title: 'Domicile Certificate',
      documents: [
        'Application form for domicile certificate',
        'Birth certificate showing place of birth',
        'School leaving certificate',
        'Address proof (minimum 15 years residence)',
        'Aadhaar card copy',
        'Parents domicile certificate (if available)'
      ]
    },
    'noncreamy': {
      title: 'Non-Creamy Layer Certificate',
      documents: [
        'Application form for NCL certificate',
        'Caste certificate of parents',
        'Income certificate of parents',
        'Service certificate of parents (if government employee)',
        'Aadhaar card copy',
        'Birth certificate'
      ]
    },
    'gazette': {
      title: 'Gazette (Name Change)',
      documents: [
        'Affidavit for name change',
        'Publication in local newspaper',
        'Birth certificate (original name)',
        'Aadhaar card copy',
        'Address proof documents',
        'Two witnesses with identity proof'
      ]
    },
    'shopact': {
      title: 'Shop Act License',
      documents: [
        'Application form for shop act license',
        'Property ownership or rental agreement',
        'Aadhaar card of proprietor',
        'PAN card of business',
        'Passport size photographs',
        'No objection certificate from owner (if rented)'
      ]
    },
    'udyam': {
      title: 'Udyam Registration',
      documents: [
        'Aadhaar number of entrepreneur',
        'PAN of enterprise',
        'Bank account details',
        'Details of existing enterprise (if any)',
        'Investment details in plant and machinery',
        'Turnover details of previous years'
      ]
    },
    'gst': {
      title: 'GST Registration',
      documents: [
        'PAN card of business',
        'Aadhaar card of proprietor/partners',
        'Business registration certificate',
        'Bank account proof',
        'Address proof of business place',
        'Photographs of business premises'
      ]
    },
    'trade': {
      title: 'Trade License',
      documents: [
        'Application form for trade license',
        'Property documents or rental agreement',
        'Layout plan of business premises',
        'NOC from fire department',
        'Pollution clearance certificate',
        'Partnership deed (if partnership firm)'
      ]
    },
    'food': {
      title: 'Food License (FSSAI)',
      documents: [
        'Form A for food license application',
        'Identity and address proof of applicant',
        'Layout plan of processing unit',
        'List of food products to be manufactured',
        'NOC from municipality/panchayat',
        'Water analysis report'
      ]
    },
    'pf': {
      title: 'PF Services (EPF)',
      documents: [
        'Aadhaar card linked with UAN',
        'Bank account with IFSC code',
        'Employment proof or service record',
        'Form 19 (for PF withdrawal)',
        'Cancelled cheque or passbook copy',
        'Exit interview letter (if applicable)'
      ]
    },
    'esi': {
      title: 'ESI Registration',
      documents: [
        'Application form for ESI registration',
        'Copy of trade license or registration',
        'List of employees with details',
        'Salary register of employees',
        'Bank account details',
        'Rent agreement of business premises'
      ]
    },
    'rent': {
      title: 'Rent Agreement',
      documents: [
        'Identity proof of tenant and landlord',
        'Address proof of both parties',
        'Property ownership documents',
        'Passport size photographs',
        'Utility bills of the property',
        'Previous rent agreement (if any)'
      ]
    },
    'land': {
      title: 'Land Record Services',
      documents: [
        'Survey number and property details',
        'Original property documents',
        'Identity proof of property owner',
        'Mutation papers (if any)',
        'Court orders (if any)',
        'Revenue records and survey settlement'
      ]
    },
    'property': {
      title: 'Property Registration',
      documents: [
        'Sale deed or agreement to sell',
        'Title documents of property',
        'Identity and address proof of parties',
        'Encumbrance certificate',
        'Property tax receipts',
        'Stamp duty and registration fee payment'
      ]
    },
    'mutation': {
      title: 'Mutation of Property',
      documents: [
        'Application for mutation',
        'Death certificate (in case of inheritance)',
        'Legal heir certificate',
        'Property documents',
        'Revenue records',
        'Court decree (if applicable)'
      ]
    },
    'ration': {
      title: 'Ration Card',
      documents: [
        'Application form for ration card',
        'Aadhaar card of all family members',
        'Income certificate',
        'Address proof documents',
        'Family photograph',
        'Bank account details'
      ]
    },
    'birth': {
      title: 'Birth Certificate',
      documents: [
        'Hospital birth certificate',
        'Parents identity proof',
        'Address proof',
        'Marriage certificate of parents',
        'Vaccination records'
      ]
    }
  };

  const calculateRent = () => {
    console.log('Calculating rent...', { monthlyRent, licensePeriod, propertyArea });
    
    const monthlyRentNum = parseFloat(monthlyRent) || 0;
    const depositNum = parseFloat(deposit) || 0;
    
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

    // Add 10% of deposit amount to the total
    const depositTenPercent = Math.round(depositNum * 0.1);
    
    // Subtotal before Govt. Stamp Duty
    const subtotal = govtRegFee + dhcFee + serviceFee + calculatedStampDuty + addonsTotal;
    
    // Govt. Stamp Duty (10%) applied only on deposit
    const calculatedGovtStampDutyTenPercent = depositTenPercent;
    
    // Final total
    const total = subtotal + calculatedGovtStampDutyTenPercent;
    
    setStampDuty(calculatedStampDuty);
    setGovtStampDutyTenPercent(calculatedGovtStampDutyTenPercent);
    setTotalAmount(total);
    setIsCalculated(true);
    
    console.log('Calculation complete:', {
      totalRent: monthlyRentNum * licensePeriod,
      stampDuty: calculatedStampDuty,
      addonsTotal,
      depositTenPercent,
      govtStampDutyTenPercent: calculatedGovtStampDutyTenPercent,
      total
    });
  };


  const handleAddonChange = (addonKey: string, checked: boolean) => {
    setAddons(prev => ({ ...prev, [addonKey]: checked }));
  };

  // Contact form submission function
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.mobile || !contactForm.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-inquiry', {
        body: {
          name: contactForm.name,
          mobile: contactForm.mobile,
          message: contactForm.message
        }
      });

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Your inquiry has been sent successfully. We'll contact you soon.",
      });

      // Reset form and show success
      setContactForm({ name: '', mobile: '', message: '' });
      setIsContactSubmitted(true);
      
      // Reset confirmation after 5 seconds
      setTimeout(() => {
        setIsContactSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error sending contact inquiry:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Smooth scroll navigation function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Service Dialog Component
  const ServiceDialog = ({ 
    serviceKey, 
    icon, 
    title, 
    description, 
    bgColor
  }: {
    serviceKey: keyof typeof serviceDocuments;
    icon: string;
    title: string;
    description: string;
    bgColor: string;
  }) => {
    const serviceData = serviceDocuments[serviceKey];
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="text-center">
                <div className={`${bgColor} p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center`}>
                  <span className="text-xl">{icon}</span>
                </div>
                <h4 className="text-lg font-bold mb-2">{title}</h4>
                <p className="text-sm text-gray-600 mb-3">{description}</p>
                <Button className="bg-brand-secondary hover:bg-brand-secondary/90" size="sm">
                  Get Started
                </Button>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="w-full max-w-2xl max-h-[85vh] overflow-y-auto" aria-describedby="service-dialog-description">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{serviceData.title}</DialogTitle>
          </DialogHeader>
          <div id="service-dialog-description" className="flex flex-col h-full space-y-4">
            <div className="flex-1 overflow-y-auto">
              <h3 className="text-lg font-semibold text-blue-600 mb-4">Required Documents:</h3>
              <div className="space-y-2">
                {serviceData.documents.map((doc: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-brand-accent/10 p-4 rounded-lg">
              <div className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> All documents should be original or certified copies. Processing time may vary based on government procedures.
                </p>
              </div>
            </div>
            <div className="flex-shrink-0 mt-auto">
              <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Your Name" />
                  <Input placeholder="Mobile Number" />
                </div>
                <Textarea placeholder="Additional Requirements or Questions" className="h-20 resize-none" />
                <Button className="w-full bg-brand-secondary hover:bg-brand-secondary/90">
                  Request Service
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary/10 to-background">
      {/* Header */}
      <nav className="bg-brand-primary text-white py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Tiro Devanagari Marathi', serif" }}>
            महाराष्ट्र ई-सेवा केंद्र
          </h1>
          <div className="hidden md:flex space-x-8 text-white">
            <button onClick={() => scrollToSection('hero')} className="hover:underline hover:text-blue-500 transition-colors">Home</button>
            <button onClick={() => scrollToSection('rent-calculator')} className="hover:underline hover:text-blue-500 transition-colors">Rent Agreement</button>
            <button onClick={() => scrollToSection('services')} className="hover:underline hover:text-blue-500 transition-colors">Services</button>
            <button onClick={() => scrollToSection('contact')} className="hover:underline hover:text-blue-500 transition-colors">Contact</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6 text-purple-700 uppercase">VKW Enterprises</h1>
          <div className="mb-6">
            <img src="/maha-e-seva-banner.svg" alt="महाराष्ट्र ई-सेवा केंद्र" className="w-full max-w-lg" />
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">Digital Services at Your Fingertips</h1>
              <p className="text-xl text-gray-600 mb-6">Complete online platform for all your Indian citizen services. Fast, reliable, and secure digital solutions.</p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-brand-secondary hover:bg-brand-secondary/90" onClick={() => scrollToSection('rent-calculator')}>
                  Rent Agreement
                </Button>
                <Button variant="outline" size="lg" onClick={() => scrollToSection('services')}>
                  All Services
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="marquee-container w-full">
                <div className="marquee-track">
                  {/* Newly uploaded logos for marquee */}
                  <img src="/lovable-uploads/PinClipart.com_17th-amendment-clipart_5745340.png" alt="Digital India" className="marquee-item" loading="lazy" />
                  <img src="/lovable-uploads/imgbin_9bcf989abbd53219b698c9180e3a5a18.png" alt="FSSAI" className="marquee-item" loading="lazy" />
                  <img src="/lovable-uploads/utiitsl-psa-pan-branch-1000x1000.png" alt="UTI PAN Service" className="marquee-item" loading="lazy" />
                  <img src="/lovable-uploads/pngegg (1).png" alt="MSME" className="marquee-item" loading="lazy" />
                  <img src="/lovable-uploads/pngegg.png" alt="Aadhaar" className="marquee-item" loading="lazy" />
                  {/* Duplicate set for seamless looping */}
                  <img src="/lovable-uploads/PinClipart.com_17th-amendment-clipart_5745340.png" alt="Digital India" className="marquee-item" loading="lazy" />
                  <img src="/lovable-uploads/imgbin_9bcf989abbd53219b698c9180e3a5a18.png" alt="FSSAI" className="marquee-item" loading="lazy" />
                  <img src="/lovable-uploads/utiitsl-psa-pan-branch-1000x1000.png" alt="UTI PAN Service" className="marquee-item" loading="lazy" />
                  <img src="/lovable-uploads/pngegg (1).png" alt="MSME" className="marquee-item" loading="lazy" />
                  <img src="/lovable-uploads/pngegg.png" alt="Aadhaar" className="marquee-item" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Complete range of digital citizen services</p>
          </div>
          
          <div className="space-y-12">
            {/* Identity Documents */}
            <div>
              <h3 className="text-2xl font-bold mb-6 bg-[hsl(var(--brand-accent))] text-white text-center">Identity Documents</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ServiceDialog 
                  serviceKey="aadhaar"
                  icon="🆔"
                  title="Aadhaar Card"
                  description="Demographic Changes • Aadhaar – PAN Link • Aadhaar – Bank Link"
                  bgColor="bg-blue-100"
                />
                <ServiceDialog 
                  serviceKey="pan"
                  icon="💳"
                  title="PAN Card"
                  description="New PAN Card • Changes in Existing PAN Card"
                  bgColor="bg-green-100"
                />
                <ServiceDialog 
                  serviceKey="voter"
                  icon="🗳️"
                  title="Voter ID"
                  description="New Voter Registration • Changes in existing Voter ID"
                  bgColor="bg-purple-100"
                />
                <ServiceDialog 
                  serviceKey="driving"
                  icon="🚗"
                  title="Driving License"
                  description="Learning • Permanent • Renewal"
                  bgColor="bg-yellow-100"
                />
                <ServiceDialog 
                  serviceKey="passport"
                  icon="📔"
                  title="Passport"
                  description="International Travel Document"
                  bgColor="bg-red-100"
                />
              </div>
            </div>

            {/* Certificates & Gazette */}
            <div>
              <h3 className="text-2xl font-bold mb-6 bg-[hsl(var(--brand-accent))] text-white text-center">Certificates & Gazette</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ServiceDialog 
                  serviceKey="income"
                  icon="💰"
                  title="Income Certificate"
                  description="Annual Income Verification"
                  bgColor="bg-indigo-100"
                />
                <ServiceDialog 
                  serviceKey="caste"
                  icon="👥"
                  title="Caste Certificate"
                  description="Social Category Verification"
                  bgColor="bg-orange-100"
                />
                <ServiceDialog 
                  serviceKey="domicile"
                  icon="🏠"
                  title="Domicile Certificate"
                  description="Residence Verification"
                  bgColor="bg-teal-100"
                />
                <ServiceDialog 
                  serviceKey="noncreamy"
                  icon="📜"
                  title="Non-Creamy Layer"
                  description="OBC Category Certificate"
                  bgColor="bg-pink-100"
                />
                <ServiceDialog 
                  serviceKey="gazette"
                  icon="📰"
                  title="Gazette"
                  description="Name Change"
                  bgColor="bg-gray-100"
                />
              </div>
            </div>

            {/* Business & Professional Services */}
            <div>
              <h3 className="text-2xl font-bold mb-6 bg-[hsl(var(--brand-accent))] text-white text-center">Business & Professional Services</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ServiceDialog 
                  serviceKey="shopact"
                  icon="🏪"
                  title="Shop Act License"
                  description="Shop & Establishment License"
                  bgColor="bg-blue-100"
                />
                <ServiceDialog 
                  serviceKey="udyam"
                  icon="🏭"
                  title="Udyam Registration"
                  description="New Udyam Registration • Changes in Existing Udyam Aadhaar"
                  bgColor="bg-green-100"
                />
                <ServiceDialog 
                  serviceKey="gst"
                  icon="📊"
                  title="GST Registration"
                  description="New GST Registration • GST Filing"
                  bgColor="bg-purple-100"
                />
                <ServiceDialog 
                  serviceKey="trade"
                  icon="🏬"
                  title="Trade License"
                  description="Municipal Trade License"
                  bgColor="bg-yellow-100"
                />
                <ServiceDialog 
                  serviceKey="food"
                  icon="🍽️"
                  title="Food License (FSSAI)"
                  description="New Food License"
                  bgColor="bg-red-100"
                />
              </div>
            </div>

            {/* Employment & Financial Services */}
            <div>
              <h3 className="text-2xl font-bold mb-6 bg-[hsl(var(--brand-accent))] text-white text-center">Employment & Financial Services</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ServiceDialog 
                  serviceKey="pf"
                  icon="💼"
                  title="PF Services (EPF)"
                  description="PF Withdrawal • PF KYC • UAN Number"
                  bgColor="bg-indigo-100"
                />
                <ServiceDialog 
                  serviceKey="esi"
                  icon="🏥"
                  title="ESI Registration"
                  description="Employee State Insurance"
                  bgColor="bg-teal-100"
                />
              </div>
            </div>

            {/* Property & Land Services */}
            <div>
              <h3 className="text-2xl font-bold mb-6 bg-[hsl(var(--brand-accent))] text-white text-center">Property & Land Services</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ServiceDialog 
                  serviceKey="rent"
                  icon="📋"
                  title="Rent Agreement"
                  description="Legal Rental Agreement"
                  bgColor="bg-green-100"
                />
                <ServiceDialog 
                  serviceKey="land"
                  icon="📄"
                  title="Land Record Services"
                  description="Property Record Verification"
                  bgColor="bg-blue-100"
                />
                <ServiceDialog 
                  serviceKey="property"
                  icon="🏡"
                  title="Property Registration"
                  description="Property Transfer Registration"
                  bgColor="bg-purple-100"
                />
                <ServiceDialog 
                  serviceKey="mutation"
                  icon="🔄"
                  title="Mutation of Property"
                  description="Property Ownership Transfer"
                  bgColor="bg-orange-100"
                />
              </div>
            </div>

            {/* Other Essential Services */}
            <div>
              <h3 className="text-2xl font-bold mb-6 bg-[hsl(var(--brand-accent))] text-white text-center">Other Essential Services</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ServiceDialog 
                  serviceKey="ration"
                  icon="🍚"
                  title="Ration Card"
                  description="Public Distribution System"
                  bgColor="bg-yellow-100"
                />
                <ServiceDialog 
                  serviceKey="birth"
                  icon="👶"
                  title="Birth Certificate"
                  description="Birth Registration Certificate"
                  bgColor="bg-pink-100"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rent Calculator */}
      <section id="rent-calculator" className="py-12 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block bg-brand-primary text-white px-6 py-3 rounded-lg">
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
                      value={licensePeriod === 0 ? '' : licensePeriod}
                      onChange={(e) => setLicensePeriod(parseInt(e.target.value) || 0)}
                      placeholder=""
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
                      placeholder=""
                      min="1"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-700 font-semibold">Deposit (₹)</Label>
                    <Input
                      type="number"
                      value={deposit}
                      onChange={(e) => setDeposit(e.target.value)}
                      placeholder=""
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
                      <div className="p-3 bg-neutral-medium rounded">₹1,000</div>
                    </div>
                    <div>
                      <Label className="text-gray-700 font-semibold">Govt. DHC</Label>
                      <div className="p-3 bg-neutral-medium rounded">₹300</div>
                    </div>
                    <div>
                      <Label className="text-gray-700 font-semibold">Govt. Stamp Duty</Label>
                      <div className="p-3 bg-neutral-medium rounded">₹{govtStampDutyTenPercent.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                {/* Service Charges */}
                <div className="mb-6">
                  <Label className="font-bold text-lg">Our Service Charges</Label>
                  <div className="p-3 bg-neutral-medium rounded">₹599</div>
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
                  <Button onClick={calculateRent} size="lg" className="bg-brand-secondary hover:bg-brand-secondary/90 px-8">
                    Calculate Total
                  </Button>
                </div>

                {/* Total Display - Only show after calculation */}
                {isCalculated && (
                  <div className="bg-brand-accent text-white text-center py-6 rounded-lg shadow-lg">
                    <div className="text-2xl font-semibold">
                      Total Cost including Govt. Charges: ₹{totalAmount.toLocaleString()}
                    </div>
                  </div>
                )}

                <div className="text-center mt-6">
                  <Button className="bg-brand-danger hover:bg-brand-danger/90 px-8" onClick={() => scrollToSection('contact')}>
                    Contact Us
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-12 pb-2 bg-brand-primary text-white">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h3 className="text-3xl font-bold mb-6" style={{ fontFamily: "'Tiro Devanagari Marathi', serif" }}>
              महाराष्ट्र ई-सेवा केंद्र
            </h3>
            <div className="space-y-4 text-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <span>Lane no3, Nagar Rd, Sai Satyam Park, Wagholi, Maharashtra 412207</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <span>+91 8956548048</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✉️</span>
                <span>admin@mahesevapoint.in</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🕒</span>
                <span>Mon-Sat: 9:00 AM - 7:00 PM</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            <div className="flex flex-col h-full">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-gray-800 text-xl">Get Quick Support</CardTitle>
                </CardHeader>
                <CardContent className="h-full">
                  {isContactSubmitted ? (
                    <div className="text-center py-8">
                      <div className="text-green-600 text-6xl mb-4">✅</div>
                      <h3 className="text-xl font-bold text-green-600 mb-2">Message Sent Successfully!</h3>
                      <p className="text-gray-600">Thank you for contacting us. We'll get back to you soon.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="h-full">
                      <div className="space-y-4">
                        <Input 
                          placeholder="Your Name" 
                          className="bg-card border-input"
                          value={contactForm.name}
                          onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                        <Input 
                          placeholder="Mobile Number" 
                          className="bg-card border-input"
                          value={contactForm.mobile}
                          onChange={(e) => setContactForm(prev => ({ ...prev, mobile: e.target.value }))}
                          required
                        />
                        <Textarea 
                          className="bg-card border-input" 
                          rows={3} 
                          placeholder="Your Message"
                          value={contactForm.message}
                          onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="mt-4">
                        <Button type="submit" className="w-full bg-brand-secondary hover:bg-brand-secondary/90">
                          Send Message
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col h-full">
              <div className="h-full">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235.89380386720927!2d73.95971569258801!3d18.576791499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c3079f919531%3A0xdd471bb89413ad3!2sMah-E%20Seva%20Point!5e0!3m2!1sen!2sin!4v1759310800!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full rounded-lg shadow-lg min-h-[250px]"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-brand-primary text-white rounded-lg p-8 shadow-xl flex flex-col gap-6">
              <div>
                <h2 className="text-4xl font-extrabold tracking-tight mb-3 uppercase">VKW Enterprises</h2>
                <p className="text-white/90">Your trusted partner for online services and documentation.</p>
              </div>
              <nav className="mt-8 space-y-3">
                <Link href="/about" className="block rounded-md bg-white/20 hover:bg-white/30 text-white px-4 py-3 transition-colors">About Us</Link>
                <Link href="/terms" className="block rounded-md bg-white/20 hover:bg-white/30 text-white px-4 py-3 transition-colors">Terms & Conditions</Link>
              </nav>
            </div>
          </div>

          {/* Copyright inside orange contact section */}
          <div className="mt-4">
            <div className="text-white text-center">
              Copyrighted by VKW Enterprises 2025
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Index;
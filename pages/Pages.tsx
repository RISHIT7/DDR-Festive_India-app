
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Home, Compass, Search, Map, Calendar, Shield, Sparkles, Star, Users, MapPin, Clock, CheckCircle, XCircle, ChevronLeft, ChevronRight, Plus, Minus, Trash2, Tag, QrCode } from 'lucide-react';

import { useStore } from '../store';
import { fetchFestivals, fetchFestivalBySlug, fetchExperiences, fetchExperienceById, fetchHostById, fetchReviewsByExperienceId, fetchPoisByFestivalSlug, fetchStoryTrailByFestivalSlug, publishNewExperience, MOCK_FESTIVALS } from '../services/api';
import { Festival, Experience, Host, Review, MapPOI, StoryTrail, CartItem } from '../types';
// FIX: Added 'CardDescription' to the import list to resolve 'Cannot find name' errors.
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge, Skeleton, Dialog, Input, Textarea, Label } from '../components/ui';
import { MapWrapper } from '../components/Map';

// --- Helper Components ---
const Rating: React.FC<{ rating: number; count?: number }> = ({ rating, count }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <Star key={i} className={i < Math.round(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} size={16} />
        ))}
        {count && <span className="text-xs text-gray-500 ml-1.5">({count} reviews)</span>}
    </div>
);

const ExperienceCard: React.FC<{ experience: Experience }> = ({ experience }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <Link to={`/experiences/${experience.id}`}>
            <img src={experience.media[0]} alt={experience.title} className="w-full h-48 object-cover" />
            <CardHeader>
                <CardTitle className="text-lg">{experience.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{experience.durationMins} mins</span>
                    <Rating rating={experience.rating} />
                </div>
            </CardContent>
            <CardFooter>
                <span className="text-xl font-bold text-indigo-600">₹{experience.priceINR}</span>
            </CardFooter>
        </Link>
    </Card>
);

// --- Pages ---

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useStore();
    const [isPrefsModalOpen, setIsPrefsModalOpen] = useState(false);
    const [selectedPrefs, setSelectedPrefs] = useState<string[]>([]);
    const PREFERENCE_OPTIONS = ['Cultural', 'Art', 'Foodie', 'Spiritual', 'Adventure', 'Family-friendly'];

    const handlePrefToggle = (pref: string) => {
        setSelectedPrefs(prev => prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]);
    };

    const handleSavePrefs = () => {
        dispatch({ type: 'SET_USER_PREFERENCES', payload: selectedPrefs });
        setIsPrefsModalOpen(false);
        navigate('/festivals');
    };

    return (
        <div>
            {/* Hero Section */}
            <div className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/seed/hero/1600/900')` }}>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Discover India's Soul</h1>
                    <p className="text-lg md:text-xl max-w-2xl mb-8">Authentic, curated experiences within the heart of India's most vibrant festivals.</p>
                    <div className="flex gap-4">
                        <Button size="lg" onClick={() => navigate('/festivals')}>Explore Festivals</Button>
                        <Button size="lg" variant="outline" className="bg-white/20 text-white border-white hover:bg-white/30" onClick={() => setIsPrefsModalOpen(true)}>Personalize My Trip</Button>
                    </div>
                </div>
            </div>

            {/* Featured Festivals */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-bold text-center mb-8">Upcoming Festivals</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {MOCK_FESTIVALS.map(festival => (
                        <Card key={festival.id} className="hover:shadow-xl transition-shadow">
                            <Link to={`/festivals/${festival.slug}`}>
                                <img src={festival.heroImage} alt={festival.name} className="w-full h-56 object-cover rounded-t-lg" />
                                <CardHeader>
                                    <CardTitle>{festival.name}</CardTitle>
                                    <CardDescription>{festival.city}, {festival.state}</CardDescription>
                                </CardHeader>
                            </Link>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Preference Modal */}
            <Dialog isOpen={isPrefsModalOpen} onClose={() => setIsPrefsModalOpen(false)} title="What are you looking for?">
                <p className="text-gray-600 mb-6">Select your interests to get personalized recommendations.</p>
                <div className="flex flex-wrap gap-3 mb-8">
                    {PREFERENCE_OPTIONS.map(pref => (
                        <button key={pref} onClick={() => handlePrefToggle(pref)} className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-colors ${selectedPrefs.includes(pref) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400'}`}>
                            {pref}
                        </button>
                    ))}
                </div>
                <Button onClick={handleSavePrefs} className="w-full">Show me recommendations</Button>
            </Dialog>
        </div>
    );
};

export const FestivalsPage: React.FC = () => {
    const { state } = useStore();
    const [festivals, setFestivals] = useState<Festival[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFestivals().then(data => {
            setFestivals(data);
            setLoading(false);
        });
    }, []);
    
    const recommendedFestivals = festivals.filter(f => state.userPreferences.some(p => f.tags.includes(p)));
    const otherFestivals = festivals.filter(f => !state.userPreferences.some(p => f.tags.includes(p)));

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-bold mb-8">All Festivals</h1>
            {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-80 w-full" />)}
                </div>
            ) : (
                <>
                    {recommendedFestivals.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 text-indigo-600">Recommended For You</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {recommendedFestivals.map(festival => (
                                    <Card key={festival.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                        <Link to={`/festivals/${festival.slug}`}>
                                            <img src={festival.heroImage} alt={festival.name} className="w-full h-56 object-cover" />
                                            <CardHeader>
                                                <CardTitle>{festival.name}</CardTitle>
                                                <CardDescription>{festival.city}, {festival.state}</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex flex-wrap gap-2">
                                                    {festival.tags.map(tag => <Badge key={tag} variant={state.userPreferences.includes(tag) ? 'primary' : 'secondary'}>{tag}</Badge>)}
                                                </div>
                                            </CardContent>
                                        </Link>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {otherFestivals.length > 0 && (
                        <div>
                             <h2 className="text-2xl font-bold mb-6">Explore More</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {otherFestivals.map(festival => (
                                    <Card key={festival.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                        <Link to={`/festivals/${festival.slug}`}>
                                            <img src={festival.heroImage} alt={festival.name} className="w-full h-56 object-cover" />
                                            <CardHeader>
                                                <CardTitle>{festival.name}</CardTitle>
                                                <CardDescription>{festival.city}, {festival.state}</CardDescription>
                                            </CardHeader>
                                        </Link>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export const FestivalDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [festival, setFestival] = useState<Festival | null>(null);
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            fetchFestivalBySlug(slug).then(data => setFestival(data || null));
            fetchExperiences(slug).then(setExperiences);
        }
    }, [slug]);

    if (!festival) return <div className="text-center py-20">Loading...</div>;

    return (
        <div>
            <div className="h-96 bg-cover bg-center" style={{ backgroundImage: `url(${festival.heroImage})` }}></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
                <Card className="p-8">
                    <h1 className="text-5xl font-bold">{festival.name}</h1>
                    <p className="text-xl text-gray-600 mt-2">{festival.city}, {festival.state}</p>
                    <p className="text-lg text-indigo-600 mt-1">{new Date(festival.dates.start).toDateString()} - {new Date(festival.dates.end).toDateString()}</p>
                    <div className="mt-6 flex flex-wrap gap-4">
                        <Button onClick={() => navigate(`/map/${festival.slug}`)}><Map size={18} className="mr-2" />Live Map</Button>
                        <Button variant="outline" onClick={() => navigate(`/storytrails/${festival.slug}`)}><Sparkles size={18} className="mr-2"/>Story Trails</Button>
                    </div>
                </Card>

                <div className="mt-12">
                    <h2 className="text-3xl font-bold mb-6">Featured Experiences</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {experiences.map(exp => <ExperienceCard key={exp.id} experience={exp} />)}
                    </div>
                </div>
                
                <div className="mt-12 grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader><CardTitle>Schedule</CardTitle></CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {festival.schedule.map(item => <li key={item.id} className="flex items-start gap-4">
                                    <div className="bg-indigo-100 text-indigo-700 rounded-lg p-2 text-center">
                                        <div className="font-bold text-sm">{new Date(item.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                                    </div>
                                    <div>
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-sm text-gray-500">{item.description}</p>
                                    </div>
                                </li>)}
                            </ul>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader><CardTitle>Safety Information</CardTitle></CardHeader>
                        <CardContent>
                             <ul className="space-y-3 text-gray-700">
                                <li className="flex items-center"><Shield size={18} className="mr-3 text-green-500"/>{festival.safety.toilets} Clean Toilets</li>
                                <li className="flex items-center"><Shield size={18} className="mr-3 text-green-500"/>{festival.safety.waterPoints} Water Points</li>
                                <li className="flex items-center"><Shield size={18} className="mr-3 text-green-500"/>{festival.safety.firstAidStations} First-Aid Stations</li>
                                {festival.safety.womenSafeCorridors && <li className="flex items-center"><Shield size={18} className="mr-3 text-green-500"/>Women-Safe Corridors</li>}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export const ExperienceDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { dispatch } = useStore();
    const navigate = useNavigate();
    const [experience, setExperience] = useState<Experience | null>(null);
    const [host, setHost] = useState<Host | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<string>('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (id) {
            fetchExperienceById(id).then(exp => {
                if (exp) {
                    setExperience(exp);
                    setSelectedSlot(exp.slots[0]?.start || '');
                    fetchHostById(exp.hostId).then(setHost);
                    fetchReviewsByExperienceId(id).then(setReviews);
                }
            });
        }
    }, [id]);

    const handleAddToCart = () => {
        if (experience && selectedSlot) {
            dispatch({ type: 'ADD_TO_CART', payload: { experience, slot: selectedSlot, qty: quantity } });
            navigate('/checkout');
        }
    };
    
    if (!experience) return <div className="text-center py-20">Loading...</div>;

    const availableSeats = experience.slots.find(s => s.start === selectedSlot)?.seats || 0;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <h1 className="text-4xl font-bold">{experience.title}</h1>
                    <div className="flex items-center gap-4 mt-2 text-gray-600">
                        <Rating rating={experience.rating} count={experience.ratingCount} />
                        <span>|</span>
                        <div className="flex items-center gap-2"><Clock size={16} />{experience.durationMins} minutes</div>
                        <span>|</span>
                        <div className="flex items-center gap-2"><Users size={16} />Up to {experience.maxGroupSize} people</div>
                    </div>
                    <img src={experience.media[0]} alt={experience.title} className="w-full h-96 object-cover rounded-lg mt-6" />
                    <p className="mt-6 text-lg text-gray-700">{experience.description}</p>
                    
                    <div className="mt-8 grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-3">What's Included</h3>
                            <ul className="space-y-2">
                                {experience.includes.map(item => <li key={item} className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" />{item}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-3">What's Not Included</h3>
                            <ul className="space-y-2">
                                {experience.excludes.map(item => <li key={item} className="flex items-center gap-2"><XCircle size={16} className="text-red-500" />{item}</li>)}
                            </ul>
                        </div>
                    </div>
                     {host && (
                        <Card className="mt-8">
                            <CardHeader className="flex-row items-center gap-4">
                                <img src={host.avatar} alt={host.name} className="w-16 h-16 rounded-full" />
                                <div>
                                    <CardTitle>Hosted by {host.name}</CardTitle>
                                    <div className="flex items-center gap-2 mt-1">
                                    <Rating rating={host.rating} count={host.totalReviews} />
                                    {host.verified && <Badge variant="success">Verified Host</Badge>}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>{host.bio}</CardContent>
                        </Card>
                     )}
                </div>

                <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle className="text-2xl">Book Your Spot</CardTitle>
                            <p className="text-3xl font-bold text-indigo-600 mt-2">₹{experience.priceINR} <span className="text-base font-normal text-gray-500">per person</span></p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="slot">Select Date & Time</Label>
                                <select id="slot" value={selectedSlot} onChange={e => setSelectedSlot(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                    {experience.slots.map(slot => <option key={slot.start} value={slot.start}>{new Date(slot.start).toLocaleString()}</option>)}
                                </select>
                            </div>
                            <div>
                                <Label>Quantity</Label>
                                <div className="flex items-center gap-4 mt-1">
                                    <Button variant="outline" size="sm" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</Button>
                                    <span>{quantity}</span>
                                    <Button variant="outline" size="sm" onClick={() => setQuantity(q => Math.min(availableSeats, experience.maxGroupSize, q + 1))}>+</Button>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{availableSeats} seats available</p>
                            </div>
                            <div className="text-xl font-bold flex justify-between">
                                <span>Total</span>
                                <span>₹{experience.priceINR * quantity}</span>
                            </div>
                            <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={availableSeats < quantity}>Add to Cart</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export const CheckoutPage: React.FC = () => {
    const { state, dispatch } = useStore();
    const navigate = useNavigate();

    const total = state.cart.reduce((acc, item) => acc + item.experience.priceINR * item.qty, 0);

    const handlePlaceOrder = () => {
        const newOrder = {
            id: `order-${Date.now()}`,
            items: state.cart.map(item => ({
                experienceId: item.experience.id,
                title: item.experience.title,
                slot: item.slot,
                qty: item.qty,
                price: item.experience.priceINR,
            })),
            totalINR: total,
            status: 'paid' as const,
            qrCodePng: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=FestiveIndiaOrder' + Date.now(),
            orderDate: new Date().toISOString(),
        };
        dispatch({ type: 'PLACE_ORDER', payload: newOrder });
        dispatch({ type: 'CLEAR_CART' });
        navigate('/orders');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-bold mb-8">Checkout</h1>
            {state.cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                        <Card>
                            <CardContent className="p-4 space-y-4">
                                {state.cart.map(item => (
                                    <div key={item.experience.id + item.slot} className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold">{item.experience.title}</p>
                                            <p className="text-sm text-gray-500">{item.qty} x ₹{item.experience.priceINR}</p>
                                        </div>
                                        <p className="font-semibold">₹{item.qty * item.experience.priceINR}</p>
                                    </div>
                                ))}
                                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>₹{total}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Payment Details (Mock)</h2>
                        <Card>
                            <CardContent className="p-4 space-y-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Your Name" />
                                </div>
                                <div>
                                    <Label htmlFor="card">Card Number</Label>
                                    <Input id="card" placeholder="**** **** **** 1234" />
                                </div>
                                <Button size="lg" className="w-full" onClick={handlePlaceOrder}>Pay ₹{total}</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
};

export const OrdersPage: React.FC = () => {
    const { state } = useStore();
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-bold mb-8">My Bookings</h1>
            {state.orders.length === 0 ? (
                <p>You have no past orders.</p>
            ) : (
                <div className="space-y-6">
                    {state.orders.map(order => (
                        <Card key={order.id}>
                            <CardHeader>
                                <div className="flex justify-between">
                                    <div>
                                        <CardTitle>Order #{order.id.slice(-6)}</CardTitle>
                                        <CardDescription>Placed on {new Date(order.orderDate).toLocaleDateString()}</CardDescription>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lg">Total: ₹{order.totalINR}</p>
                                        <Badge variant={order.status === 'paid' ? 'success' : 'warning'}>{order.status}</Badge>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex flex-col md:flex-row gap-6">
                                <div className="flex-grow space-y-2">
                                    {order.items.map(item => (
                                        <div key={item.experienceId + item.slot}>
                                            <p className="font-semibold">{item.title}</p>
                                            <p className="text-sm text-gray-500">{item.qty} tickets for {new Date(item.slot).toLocaleString()}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex-shrink-0">
                                    <img src={order.qrCodePng} alt="QR Code" className="w-32 h-32" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export const LiveMapPage: React.FC = () => {
    const { festivalSlug } = useParams<{ festivalSlug: string }>();
    const [festival, setFestival] = useState<Festival | null>(null);
    const [pois, setPois] = useState<MapPOI[]>([]);
    
    useEffect(() => {
        if(festivalSlug) {
            fetchFestivalBySlug(festivalSlug).then(setFestival);
            fetchPoisByFestivalSlug(festivalSlug).then(setPois);
        }
    }, [festivalSlug]);

    if (!festival) return <div>Loading map...</div>;

    const centerCoord: [number, number] = festival.zones.length > 0 ? festival.zones[0].bounds[0] as [number, number] : [88.363, 22.572]; // Default to Kolkata if no zones

    return (
        <div className="h-[calc(100vh-4rem)]">
            <MapWrapper center={centerCoord} zoom={15} pois={pois} zones={festival.zones} />
        </div>
    );
};

export const StoryTrailPage: React.FC = () => {
    const { festivalSlug } = useParams<{ festivalSlug: string }>();
    const [storyTrail, setStoryTrail] = useState<StoryTrail | null>(null);

    useEffect(() => {
        if(festivalSlug) {
            fetchStoryTrailByFestivalSlug(festivalSlug).then(setStoryTrail);
        }
    }, [festivalSlug]);

    if (!storyTrail) return <div>Loading story...</div>;

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-bold mb-2">{storyTrail.title}</h1>
            <p className="text-lg text-gray-500 mb-8">An immersive audio-visual journey.</p>
            <div className="space-y-8">
                {storyTrail.steps.map((step, index) => (
                    <Card key={step.id}>
                        <div className="md:flex">
                           <img src={step.image} alt={step.title} className="w-full md:w-1/3 h-48 object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"/>
                           <div className="p-6 flex-grow">
                                <h3 className="text-xl font-semibold mb-2">{index+1}. {step.title}</h3>
                                <p className="text-gray-600 mb-4">{step.transcript}</p>
                                {/* AR Placeholder */}
                                <Button variant="outline"><Sparkles size={16} className="mr-2"/>Launch AR Experience</Button>
                           </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export const HostDashboardPage: React.FC = () => {
    const [newExperience, setNewExperience] = useState({ title: '', priceINR: 500, durationMins: 60, description: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // This is a simplified version of the experience object
        const experienceData: any = {
            festivalId: 'durga-puja-kolkata-2025', // Mock
            title: newExperience.title,
            priceINR: Number(newExperience.priceINR),
            durationMins: Number(newExperience.durationMins),
            maxGroupSize: 10,
            languages: ['English'],
            includes: ['Guided tour'],
            excludes: [],
            meetPoint: {id:'meet-new', type:'meet', name:'New Meet Point', coord: [88.3, 22.5]},
            hostId: 'host-1', // Mock
            media: ['https://picsum.photos/seed/newexp/600/400'],
            safetyBadges: ['Certified Safe'],
            slots: [{ start: '2025-10-11T10:00:00', seats: 10 }],
            description: newExperience.description,
            tags: ['Cultural']
        };
        await publishNewExperience(experienceData);
        alert('New experience submitted for review!');
        setNewExperience({ title: '', priceINR: 500, durationMins: 60, description: '' });
        setIsSubmitting(false);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-bold mb-8">Host Dashboard</h1>
            <div className="grid lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                    <CardHeader><CardTitle>Create New Experience</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" value={newExperience.title} onChange={e => setNewExperience({...newExperience, title: e.target.value})} required/>
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="price">Price (INR)</Label>
                                    <Input id="price" type="number" value={newExperience.priceINR} onChange={e => setNewExperience({...newExperience, priceINR: Number(e.target.value)})} required/>
                                </div>
                                <div>
                                    <Label htmlFor="duration">Duration (Mins)</Label>
                                    <Input id="duration" type="number" value={newExperience.durationMins} onChange={e => setNewExperience({...newExperience, durationMins: Number(e.target.value)})} required/>
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" value={newExperience.description} onChange={e => setNewExperience({...newExperience, description: e.target.value})} required/>
                            </div>
                            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit for Review'}</Button>
                        </form>
                    </CardContent>
                </Card>
                <div className="space-y-6">
                    <Card>
                        <CardHeader><CardTitle>Today's Bookings</CardTitle></CardHeader>
                        <CardContent><p className="text-gray-500">No bookings for today.</p></CardContent>
                    </Card>
                     <Card>
                        <CardHeader><CardTitle>Payout Estimate</CardTitle></CardHeader>
                        <CardContent><p className="text-3xl font-bold">₹0.00</p></CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export const AdminPage: React.FC = () => {
    const { dispatch } = useStore();
    const alertMessageRef = useRef<HTMLInputElement>(null);

    const handlePushAlert = () => {
        if (alertMessageRef.current?.value) {
            dispatch({ type: 'SET_GLOBAL_ALERT', payload: alertMessageRef.current.value });
            alert('Alert pushed!');
            alertMessageRef.current.value = '';
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-bold mb-8">Admin Console (Read-Only Demo)</h1>
            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader><CardTitle>Push Global Alert</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                         <p className="text-sm text-gray-600">Push a banner alert to all users. E.g., "Zone C is currently at high density."</p>
                        <Input ref={alertMessageRef} placeholder="Alert message..." />
                        <Button onClick={handlePushAlert}>Push Alert</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Pending Host Verifications</CardTitle></CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold">Sanjay Singh</p>
                                <p className="text-sm text-gray-500">Submitted 2 days ago</p>
                            </div>
                            <Button variant="outline" size="sm">View & Approve</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

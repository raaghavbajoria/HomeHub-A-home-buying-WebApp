import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    location: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
    MinPrice: 0,
    MaxPrice: 1000000000,
    MinBed: 0,
    MaxBed: 100,
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const addressFromUrl = urlParams.get('location');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');
    const MinPriceFromUrl = urlParams.get('MinPrice');
    const MaxPriceFromUrl = urlParams.get('MaxPrice');
    const MinBedFromUrl = urlParams.get('MinBed');
    const MaxBedFromUrl = urlParams.get('MaxBed');

    if (
      searchTermFromUrl ||
      addressFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl ||
      MinPriceFromUrl ||
      MaxPriceFromUrl ||
      MinBedFromUrl ||
      MaxBedFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        location: addressFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
        MinPrice: MinPriceFromUrl || 0,
        MaxPrice: MaxPriceFromUrl || 1000000000,
        MinBed: MinBedFromUrl || 0,
        MaxBed: MaxBedFromUrl || 100,

      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      console.log(data);
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };
    fetchListings();
  }, [location.search]);
  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }
    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (e.target.id === 'location') {
      setSidebardata({ ...sidebardata, location: e.target.value });
    }
    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }
    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';
      const order = e.target.value.split('_')[1] || 'desc';
      setSidebardata({ ...sidebardata, sort, order });
    }
    if (e.target.id === 'Price') {
      if (e.target.value === '1') {
        setSidebardata({ ...sidebardata, MinPrice: 0 , MaxPrice: 1000000000 });
        // setSidebardata({ ...sidebardata);
      }
      if (e.target.value === '2') {
        setSidebardata({ ...sidebardata, MinPrice: 0 , MaxPrice: 500000});
        // setSidebardata({ ...sidebardata, MaxPrice: 500000 });
      }
      if (e.target.value === '3') {
        setSidebardata({ ...sidebardata, MinPrice: 500000, MaxPrice: 1000000 });
        // setSidebardata({ ...sidebardata, MaxPrice: 1000000 });
      }
      if (e.target.value === '4') {
        setSidebardata({ ...sidebardata, MinPrice: 1000000 , MaxPrice: 5000000 });
        // setSidebardata({ ...sidebardata, MaxPrice: 5000000 });
      }
      if (e.target.value === '5') {
        setSidebardata({ ...sidebardata, MinPrice: 5000000 , MaxPrice: 10000000 });
        // setSidebardata({ ...sidebardata, MaxPrice: 10000000 });
      }
      if (e.target.value === '6') {
        setSidebardata({ ...sidebardata, MinPrice: 10000001 , MaxPrice: 1000000000});
        // setSidebardata({ ...sidebardata, MaxPrice: 1000000000 });
      }

    }
    if (e.target.id === 'Bed') {
      if (e.target.value === '1') {
        setSidebardata({ ...sidebardata, MinBed: 0 , MaxBed: 100 });
        // setSidebardata({ ...sidebardata);
      }
      if (e.target.value === '2') {
        setSidebardata({ ...sidebardata, MinBed: 1 , MaxBed: 1});
        // setSidebardata({ ...sidebardata, MaxPrice: 500000 });
      }
      if (e.target.value === '3') {
        setSidebardata({ ...sidebardata, MinBed: 2, MaxBed: 2 });
        // setSidebardata({ ...sidebardata, MaxPrice: 1000000 });
      }
      if (e.target.value === '4') {
        setSidebardata({ ...sidebardata, MinBed: 3 , MaxBed: 3 });
        // setSidebardata({ ...sidebardata, MaxPrice: 5000000 });
      }
      if (e.target.value === '5') {
        setSidebardata({ ...sidebardata, MinBed: 4 , MaxBed: 4 });
        // setSidebardata({ ...sidebardata, MaxPrice: 10000000 });
      }
      if (e.target.value === '6') {
        setSidebardata({ ...sidebardata, MinBed: 5 , MaxBed: 5});
        // setSidebardata({ ...sidebardata, MaxPrice: 1000000000 });
      }
      if (e.target.value === '7') {
        setSidebardata({ ...sidebardata, MinBed: 6 , MaxBed: 100});
        // setSidebardata({ ...sidebardata, MaxPrice: 1000000000 });
      }

    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('location', sidebardata.location);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    urlParams.set('MinPrice', sidebardata.MinPrice);
    urlParams.set('MaxPrice', sidebardata.MaxPrice);
    urlParams.set('MinBed', sidebardata.MinBed);
    urlParams.set('MaxBed', sidebardata.MaxBed);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Location:
            </label>
            <input
              type='text'
              id='location'
              placeholder='Location...'
              className='border rounded-lg p-3 w-full'
              value={sidebardata.location}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='all'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'all'}
              />
              <span>Rent & Sale</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'sale'}
              />
              <span>Sale</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Amenities:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order'
              className='border rounded-lg p-3'
            >
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to hight</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Bedrooms:</label>
            <select
              onChange={handleChange}
              defaultValue='1'
              id='Bed'
              className='border rounded-lg p-3'
            >
              <option value='1'>All</option>
              <option value='2'>1</option>
              <option value='3'>2</option>
              <option value='4'>3</option>
              <option value='5'>4</option>
              <option value='6'>5</option>
              <option value='7'>More than 5</option>

            </select>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Price range:</label>
            <select
              onChange={handleChange}
              defaultValue='1'
              id='Price'
              className='border rounded-lg p-3'
            >
              <option value='1'>All</option>
              <option value='2'>0 to 5lakh</option>
              <option value='3'>5 lakh to 10 lakh</option>
              <option value='4'>10lakh to 50lakh</option>
              <option value='5'>50lakh to 1 cr</option>
              <option value='6'>Greater than 1 cr</option>
            </select>
          </div>
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Listing results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>No listing found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}
          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
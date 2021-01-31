import axios from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetchVenue = (vid) => {
  return axios.get(`/api/getVenue?vid=${vid}`);
};

function Page() {
  const router = useRouter();
  const { vid } = router.query;

  const { data, error } = useSWR(vid ? vid : null, fetchVenue);

  // return <pre>data</pre>;
  return <pre>{data && JSON.stringify(data.data.response.venue, null, 2)}</pre>;
}

export default Page;

import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, ChefHat, ShieldCheck, Users } from "lucide-react";

const About = () => {
  return (
    <div className="px-6 py-10 max-w-5xl mx-auto text-justify leading-8 text-base">
      <h1 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <ChefHat className="w-8 h-8 text-orange-500" /> About Our Restaurant
      </h1>

      <Card className="mb-6">
        <CardContent className="p-4">
          <p>
            Welcome to [Restaurant Name], a culinary journey that began with a
            vision of excellence and a passion for creating memorable dining
            experiences. From our modest beginnings to becoming a beacon of
            taste and hospitality in the community, our story is one of
            dedication, quality, and service.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-4 flex gap-4">
          <BadgeCheck className="w-6 h-6 text-green-500 mt-1" />
          <p>
            At [Restaurant Name], food preparation is a sacred art. Our kitchen,
            the heart of our establishment, operates with a commitment to
            cleanliness, precision, and passion. Every ingredient is sourced
            with care, often from local farmers and sustainable providers. Our
            chefs handpick vegetables, meats, and herbs to ensure that each
            component meets our rigorous standards. Preparation begins early
            each day with a detailed routine that includes washing, cutting,
            marinating, and portioning. Each station in the kitchen is designed
            for optimal workflow, and hygiene protocols are strictly followed.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-4 flex gap-4">
          <Users className="w-6 h-6 text-blue-500 mt-1" />
          <p>
            The culinary process doesn’t end in the kitchen; it extends into our
            service. From the moment a dish is ready, our team ensures it’s
            served promptly and at the right temperature. Whether you,re dining
            in, ordering takeout, or using our delivery service, our staff is
            trained to handle each request with professionalism and warmth.
            Tables are set with care, and customer preferences are remembered
            and respected.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-4 flex gap-4">
          <ShieldCheck className="w-6 h-6 text-purple-500 mt-1" />
          <p>
            Quality control is embedded into every layer of our operations. We
            conduct daily inspections of the kitchen and service areas, hold
            tasting sessions, and train our staff regularly. Feedback from
            customers is not just heard but analyzed and incorporated into our
            improvements. Every dish that leaves our kitchen reflects our
            commitment to excellence.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;

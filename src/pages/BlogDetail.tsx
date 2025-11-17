import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';

interface BlogPost {
  title: string;
  shortDescription: string;
  image: string;
  author: string;
  date: string;
  category: string;
  content: {
    introduction: string;
    sections: Array<{ heading: string; content: string }>;
    keyPoints?: string[];
    conclusion: string;
  };
}

const blogPosts: Record<string, BlogPost> = {
  'hydration-and-heart-health': {
    title: 'Hydration and Heart Health',
    shortDescription: 'Why staying hydrated supports cardiovascular function.',
    image: 'assets/img/hydration-heart-health.jpg',
    author: 'Dr. Sarah Mwangi',
    date: 'November 15, 2024',
    category: 'Cardiology',
    content: {
      introduction:
        'Water is essential for life, and its importance extends far beyond quenching thirst. Proper hydration plays a crucial role in maintaining cardiovascular health. Your heart, which pumps approximately 2,000 gallons of blood daily, relies heavily on adequate fluid intake to function optimally.',
      sections: [
        {
          heading: 'How Hydration Affects Your Heart',
          content:
            "When you're well-hydrated, your blood volume is maintained at optimal levels. This means your heart doesn't have to work as hard to pump blood throughout your body. Dehydration, on the other hand, causes your blood volume to decrease, making your heart work harder to circulate blood. This increased workload can lead to elevated heart rate and blood pressure, putting unnecessary strain on your cardiovascular system.",
        },
        {
          heading: 'The Science Behind It',
          content:
            "Blood is approximately 90% water. When you're dehydrated, your blood becomes thicker and more viscous, which increases resistance in your blood vessels. This forces your heart to pump harder to maintain adequate blood flow. Studies have shown that even mild dehydration (as little as 1-2% loss of body water) can negatively impact cardiovascular function.",
        },
        {
          heading: 'Signs of Dehydration to Watch For',
          content:
            "Common signs include dark yellow urine, dry mouth, fatigue, dizziness, and infrequent urination. More severe symptoms may include rapid heartbeat, low blood pressure, and confusion. It's important to drink water before you feel thirsty, as thirst is often a late indicator of dehydration.",
        },
        {
          heading: 'How Much Water Do You Need?',
          content:
            'While the "8 glasses a day" rule is a good starting point, individual needs vary based on age, activity level, climate, and overall health. A more accurate guideline is to drink half your body weight in ounces of water daily. For example, if you weigh 150 pounds, aim for 75 ounces of water. Remember that fruits, vegetables, and other beverages also contribute to your daily fluid intake.',
        },
      ],
      keyPoints: [
        'Adequate hydration helps maintain optimal blood volume, reducing strain on your heart',
        'Dehydration can cause increased heart rate and blood pressure',
        'Even mild dehydration (1-2%) can negatively impact cardiovascular function',
        'Drink water throughout the day, not just when you feel thirsty',
        'Monitor your urine color as an indicator of hydration status',
        'Individual water needs vary based on multiple factors',
      ],
      conclusion:
        'Maintaining proper hydration is one of the simplest yet most effective ways to support your heart health. Make it a habit to drink water regularly throughout the day, especially before, during, and after physical activity. If you have heart conditions or take medications that affect fluid balance, consult with your healthcare provider about your specific hydration needs.',
    },
  },
  'understanding-blood-pressure': {
    title: 'Understanding Blood Pressure',
    shortDescription: 'Know your numbers and what they mean.',
    image: 'assets/img/understanding-blood-pressure.jpg',
    author: 'Dr. James Ochieng',
    date: 'November 12, 2024',
    category: 'Cardiology',
    content: {
      introduction:
        'Blood pressure is one of the most important vital signs your healthcare provider monitors. Understanding what your numbers mean and how to maintain healthy blood pressure is crucial for preventing heart disease, stroke, and other serious health conditions.',
      sections: [
        {
          heading: 'What is Blood Pressure?',
          content:
            "Blood pressure is the force exerted by circulating blood against the walls of your arteries. It's measured in millimeters of mercury (mmHg) and recorded as two numbers: systolic (the top number) and diastolic (the bottom number). Systolic pressure measures the force when your heart beats and pumps blood, while diastolic pressure measures the force when your heart is at rest between beats.",
        },
        {
          heading: 'Understanding Your Numbers',
          content:
            'Normal blood pressure is typically considered less than 120/80 mmHg. Elevated blood pressure ranges from 120-129 systolic and less than 80 diastolic. Stage 1 hypertension is 130-139 systolic or 80-89 diastolic, while Stage 2 hypertension is 140/90 or higher. A reading above 180/120 is considered a hypertensive crisis and requires immediate medical attention.',
        },
        {
          heading: 'Risk Factors for High Blood Pressure',
          content:
            'Several factors can increase your risk of developing high blood pressure, including age, family history, being overweight, lack of physical activity, excessive salt intake, alcohol consumption, stress, and certain chronic conditions like diabetes and kidney disease. Some of these factors are modifiable through lifestyle changes.',
        },
        {
          heading: 'Managing Your Blood Pressure',
          content:
            "Lifestyle modifications are the first line of defense against high blood pressure. These include maintaining a healthy weight, engaging in regular physical activity (at least 150 minutes per week), reducing sodium intake, limiting alcohol, managing stress, and eating a heart-healthy diet rich in fruits, vegetables, and whole grains. If lifestyle changes aren't sufficient, your doctor may prescribe medication.",
        },
      ],
      keyPoints: [
        'Blood pressure is measured as systolic/diastolic (e.g., 120/80 mmHg)',
        'Normal blood pressure is less than 120/80 mmHg',
        'High blood pressure often has no symptoms, making regular monitoring important',
        'Lifestyle changes can significantly impact blood pressure',
        "Medication may be necessary if lifestyle modifications aren't enough",
        'Regular check-ups are essential for monitoring and managing blood pressure',
      ],
      conclusion:
        "Understanding your blood pressure numbers empowers you to take control of your cardiovascular health. Regular monitoring, combined with healthy lifestyle choices, can help prevent complications. If you have concerns about your blood pressure or haven't had it checked recently, schedule an appointment with your healthcare provider.",
    },
  },
  'childhood-vaccination-guide': {
    title: 'Childhood Vaccination Guide',
    shortDescription: 'Essential shots and schedules for kids.',
    image: 'assets/img/childhood-vaccination-guide.jpg',
    author: 'Dr. Mary Nakato',
    date: 'November 10, 2024',
    category: 'Pediatrics',
    content: {
      introduction:
        "Vaccinations are one of the most effective ways to protect children from serious, preventable diseases. Following the recommended vaccination schedule ensures your child develops immunity at the optimal times, providing protection when they're most vulnerable.",
      sections: [
        {
          heading: 'Why Vaccinations Matter',
          content:
            "Vaccines work by training your child's immune system to recognize and fight specific diseases. They contain weakened or inactivated parts of disease-causing organisms that stimulate an immune response without causing the actual disease. This protection helps prevent serious complications, hospitalizations, and even death from vaccine-preventable diseases.",
        },
        {
          heading: 'Recommended Vaccination Schedule',
          content:
            "The vaccination schedule is designed to protect children when they're most vulnerable. Key vaccinations include: Birth (Hepatitis B), 2 months (DTaP, Hib, Polio, PCV, Rotavirus), 4 months (same as 2 months), 6 months (DTaP, Hib, Polio, PCV, Rotavirus, Influenza), 12-15 months (MMR, Varicella, Hib, PCV), 18 months (DTaP), 4-6 years (DTaP, MMR, Varicella, Polio), and 11-12 years (HPV, Tdap, Meningococcal).",
        },
        {
          heading: 'Common Concerns Addressed',
          content:
            "Many parents have concerns about vaccine safety. It's important to know that vaccines undergo rigorous testing before approval and continue to be monitored for safety. Serious side effects are extremely rare, while the diseases they prevent can cause severe complications. The benefits of vaccination far outweigh the risks.",
        },
        {
          heading: 'Preparing for Vaccination',
          content:
            "Before your child's vaccination appointment, ensure they're well-rested and have eaten. Bring their vaccination record card. You can discuss any concerns with your pediatrician. After vaccination, your child may experience mild side effects like soreness at the injection site, mild fever, or fussiness, which are normal and typically resolve within a day or two.",
        },
      ],
      keyPoints: [
        'Vaccinations protect children from serious, preventable diseases',
        'Following the recommended schedule ensures optimal protection',
        'Vaccines are extensively tested and monitored for safety',
        'Mild side effects are normal and typically resolve quickly',
        'Keep a vaccination record for your child',
        'Discuss any concerns with your pediatrician',
      ],
      conclusion:
        "Vaccinations are a crucial part of keeping your child healthy. By following the recommended schedule and maintaining open communication with your pediatrician, you're providing your child with the best protection against preventable diseases. If you have questions or concerns about vaccinations, don't hesitate to discuss them with your healthcare provider.",
    },
  },
  'oral-hygiene-basics': {
    title: 'Oral Hygiene Basics',
    shortDescription: 'Simple daily habits for healthier teeth.',
    image: 'assets/img/oral-hygiene-basics.jpg',
    author: 'Dr. Peter Kigozi',
    date: 'November 8, 2024',
    category: 'Dental',
    content: {
      introduction:
        'Good oral hygiene is essential not just for a beautiful smile, but for overall health. Poor oral health has been linked to various systemic conditions including heart disease, diabetes, and respiratory infections. Establishing simple daily habits can significantly improve your oral health and overall wellbeing.',
      sections: [
        {
          heading: 'The Foundation: Brushing Your Teeth',
          content:
            'Brush your teeth at least twice daily with fluoride toothpaste, ideally after breakfast and before bed. Use a soft-bristled toothbrush and replace it every three to four months. Brush for at least two minutes, covering all surfaces of your teeth. Use gentle, circular motions rather than aggressive scrubbing, which can damage enamel and gums.',
        },
        {
          heading: "Don't Forget to Floss",
          content:
            "Flossing removes plaque and food particles from between teeth where your toothbrush can't reach. Floss at least once daily, preferably before bedtime. Use about 18 inches of floss, winding most around your middle fingers and leaving 1-2 inches to work with. Gently guide the floss between teeth using a rubbing motion, curving it around each tooth in a C-shape.",
        },
        {
          heading: 'The Role of Mouthwash',
          content:
            'While not a substitute for brushing and flossing, mouthwash can be a valuable addition to your oral hygiene routine. Therapeutic mouthwashes containing fluoride or antimicrobial agents can help reduce plaque, prevent gingivitis, and strengthen teeth. Use mouthwash after brushing and flossing, and avoid eating or drinking for 30 minutes afterward for maximum effectiveness.',
        },
        {
          heading: 'Diet and Oral Health',
          content:
            'What you eat significantly impacts your oral health. Limit sugary and acidic foods and beverages, which can erode enamel and promote cavities. Instead, choose foods rich in calcium, phosphorus, and vitamins C and D. Crunchy fruits and vegetables can help clean teeth naturally, while dairy products provide calcium for strong teeth and bones.',
        },
        {
          heading: 'Regular Dental Check-ups',
          content:
            "Visit your dentist at least twice yearly for professional cleanings and examinations. These visits allow for early detection of problems like cavities, gum disease, and oral cancer. Professional cleanings remove tartar that can't be removed by brushing and flossing alone.",
        },
      ],
      keyPoints: [
        'Brush teeth at least twice daily with fluoride toothpaste',
        'Floss daily to remove plaque between teeth',
        'Replace your toothbrush every 3-4 months',
        'Limit sugary and acidic foods and beverages',
        'Visit your dentist at least twice yearly',
        'Use mouthwash as a supplement, not a replacement for brushing',
      ],
      conclusion:
        "Maintaining good oral hygiene doesn't require complex routines—just consistent, simple habits practiced daily. By brushing properly, flossing regularly, eating a balanced diet, and visiting your dentist, you can maintain healthy teeth and gums for life. Remember, good oral health contributes to your overall health and wellbeing.",
    },
  },
  'preparing-for-surgery': {
    title: 'Preparing for Surgery',
    shortDescription: 'What to expect from pre-op to recovery.',
    image: 'assets/img/preparing-for-surgery.jpg',
    author: 'Dr. Robert Ssemwogerere',
    date: 'November 5, 2024',
    category: 'Surgery',
    content: {
      introduction:
        "Preparing for surgery can feel overwhelming, but understanding what to expect and how to prepare can significantly reduce anxiety and improve outcomes. Whether you're having a minor procedure or major surgery, proper preparation is key to a smooth experience and successful recovery.",
      sections: [
        {
          heading: 'Pre-Operative Consultation',
          content:
            "Your pre-operative consultation is crucial. During this visit, your surgeon will review your medical history, current medications, and any allergies. You'll discuss the procedure in detail, including risks and benefits. This is the time to ask questions and address any concerns. You may also meet with an anesthesiologist to discuss anesthesia options and risks.",
        },
        {
          heading: 'Pre-Surgery Instructions',
          content:
            "Follow your surgeon's instructions carefully. These typically include fasting (usually no food or drink after midnight before surgery), medication adjustments (some medications like blood thinners may need to be stopped), and lifestyle modifications (such as quitting smoking). You may also need to arrange for someone to drive you home after the procedure.",
        },
        {
          heading: 'The Day of Surgery',
          content:
            "Arrive at the hospital or surgical center at the specified time, usually 1-2 hours before your procedure. Bring a list of your medications, insurance information, and identification. Wear comfortable, loose-fitting clothing. You'll change into a hospital gown, and an IV line may be started. The surgical team will verify your identity and the procedure site before beginning.",
        },
        {
          heading: 'Post-Operative Recovery',
          content:
            "After surgery, you'll be monitored in a recovery room until the anesthesia wears off. You may experience some pain, nausea, or grogginess, which is normal. The medical team will manage your pain and monitor your vital signs. Once stable, you'll receive discharge instructions covering wound care, activity restrictions, medications, and follow-up appointments.",
        },
        {
          heading: 'Recovery at Home',
          content:
            'Follow your discharge instructions carefully. Rest is important, but light activity as recommended can aid recovery. Take medications as prescribed, especially pain medications and antibiotics if prescribed. Keep surgical sites clean and dry, and watch for signs of infection like increased redness, swelling, or discharge. Contact your surgeon if you have concerns.',
        },
      ],
      keyPoints: [
        'Attend all pre-operative appointments and follow instructions carefully',
        'Fast as directed before surgery (typically nothing after midnight)',
        'Arrange for transportation home after the procedure',
        'Bring a list of medications and insurance information',
        'Follow post-operative instructions for optimal recovery',
        'Contact your surgeon if you notice signs of infection or complications',
      ],
      conclusion:
        "Preparing for surgery involves both physical and mental preparation. By following your surgeon's instructions, asking questions, and understanding what to expect, you can approach your procedure with confidence. Remember, your surgical team is there to support you throughout the process. Don't hesitate to communicate any concerns or questions.",
    },
  },
  'managing-diabetes': {
    title: 'Managing Diabetes',
    shortDescription: 'Diet, exercise, and medication tips.',
    image: 'assets/img/managing-diabetes.jpg',
    author: 'Dr. Grace Nalubega',
    date: 'November 3, 2024',
    category: 'Endocrinology',
    content: {
      introduction:
        'Living with diabetes requires a comprehensive approach that combines medication, diet, exercise, and regular monitoring. While it may seem overwhelming at first, with the right knowledge and support, you can successfully manage your diabetes and live a healthy, active life.',
      sections: [
        {
          heading: 'Understanding Blood Sugar Control',
          content:
            'The goal of diabetes management is to keep your blood sugar levels within a target range. This prevents complications and helps you feel your best. Regular blood glucose monitoring helps you understand how food, activity, stress, and medications affect your levels. Work with your healthcare team to establish target ranges that are right for you.',
        },
        {
          heading: 'The Role of Diet',
          content:
            'A balanced diet is fundamental to diabetes management. Focus on consistent meal timing and portion control. Include plenty of non-starchy vegetables, whole grains, lean proteins, and healthy fats. Limit refined carbohydrates, sugary foods, and processed items. Consider working with a registered dietitian who specializes in diabetes to create a personalized meal plan. Carbohydrate counting or the plate method can help you manage portions effectively.',
        },
        {
          heading: 'Exercise and Physical Activity',
          content:
            'Regular physical activity helps your body use insulin more effectively and can lower blood sugar levels. Aim for at least 150 minutes of moderate-intensity exercise per week, such as brisk walking, swimming, or cycling. Include strength training exercises at least twice weekly. Always check your blood sugar before and after exercise, especially if you take insulin or medications that can cause low blood sugar.',
        },
        {
          heading: 'Medication Management',
          content:
            'Many people with diabetes need medication to help manage their blood sugar. This may include oral medications, injectable medications, or insulin. Take medications exactly as prescribed, and never skip doses without consulting your doctor. Understand how your medications work, their potential side effects, and how they interact with food and exercise.',
        },
        {
          heading: 'Monitoring and Regular Check-ups',
          content:
            'Regular monitoring of blood sugar, along with periodic A1C tests (which measure average blood sugar over 2-3 months), helps track your progress. Regular check-ups with your healthcare team allow for medication adjustments and early detection of complications. Annual eye exams, foot exams, and kidney function tests are also important.',
        },
      ],
      keyPoints: [
        'Keep blood sugar levels within your target range',
        'Follow a balanced diet with consistent meal timing',
        'Engage in regular physical activity (150+ minutes per week)',
        'Take medications as prescribed and understand how they work',
        'Monitor blood sugar regularly and track patterns',
        'Attend regular check-ups and screenings for complications',
      ],
      conclusion:
        "Managing diabetes is a lifelong journey that requires commitment and support. By combining proper medication use, healthy eating, regular exercise, and consistent monitoring, you can maintain good blood sugar control and prevent complications. Remember, you're not alone—work closely with your healthcare team, and don't hesitate to seek support from diabetes educators, support groups, or mental health professionals when needed.",
    },
  },
};

export default function BlogDetail() {
  const { postSlug } = useParams<{ postSlug: string }>();
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = revealRef.current?.querySelectorAll('.reveal-up');
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('!opacity-100', '!translate-y-0');
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  if (!postSlug || !blogPosts[postSlug]) {
    return (
      <section className="py-16" ref={revealRef}>
        <Helmet>
          <title>Post Not Found | Gallena Medical Centre</title>
        </Helmet>
        <div className="container-1120">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-semibold mb-4">Post Not Found</h1>
            <p className="muted mb-6">The blog post you're looking for doesn't exist.</p>
            <Link to="/blog" className="btn btn-primary">
              View All Posts
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const post = blogPosts[postSlug];

  return (
    <section className="py-16" ref={revealRef}>
      <Helmet>
        <title>{post.title} | Gallena Medical Centre Blog</title>
        <meta name="description" content={post.shortDescription} />
      </Helmet>
      <div className="container-1120">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 reveal-up opacity-0 translate-y-3 transition">
            <Link to="/blog" className="text-brand-blue hover:underline mb-4 inline-block">
              ← Back to Blog
            </Link>
          </div>

          <article className="reveal-up opacity-0 translate-y-3 transition">
            <div className="mb-8">
              <h1 className="text-4xl font-semibold mb-6">{post.title}</h1>

              <div className="card card-3d p-6 mb-6">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-3 px-4 font-semibold text-brand-blue w-1/3">Category</td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-medium">
                          {post.category}
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-3 px-4 font-semibold text-brand-blue w-1/3">Author</td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                        {post.author}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-brand-blue w-1/3">Published</td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{post.date}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="w-full h-96 rounded-xl overflow-hidden mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="card card-3d p-6 mb-8">
                <p className="text-lg leading-relaxed">{post.content.introduction}</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                {post.content.sections.map((section, idx) => (
                  <div key={idx} className="card card-3d p-6">
                    <h2 className="text-xl font-semibold mb-4 text-brand-blue border-b border-slate-200 dark:border-slate-700 pb-2">
                      {section.heading}
                    </h2>
                    <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>

              {post.content.keyPoints && (
                <div className="card card-3d p-6 mb-8 overflow-hidden">
                  <h2 className="text-2xl font-semibold mb-6 text-brand-blue border-b border-slate-200 dark:border-slate-700 pb-3">
                    Key Takeaways
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <tbody>
                        {post.content.keyPoints.map((point, idx) => (
                          <tr
                            key={idx}
                            className={`border-b border-slate-200 dark:border-slate-700 ${
                              idx % 2 === 0
                                ? 'bg-slate-50 dark:bg-slate-900/50'
                                : 'bg-white dark:bg-black'
                            } hover:bg-brand-blue/5 transition-colors`}
                          >
                            <td className="py-4 px-6 w-12">
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-green/20 text-brand-green font-semibold text-sm">
                                {idx + 1}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <span className="text-slate-700 dark:text-slate-300">{point}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="card card-3d p-6 mb-8 bg-gradient-to-br from-brand-blue/5 to-brand-green/5 border-2 border-brand-blue/20">
                <h2 className="text-2xl font-semibold mb-4 text-brand-blue">Summary</h2>
                <p className="leading-relaxed text-lg text-slate-700 dark:text-slate-300">
                  {post.content.conclusion}
                </p>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-8 mt-8">
              <div className="text-center">
                <Link to="/#consultation" className="btn btn-primary btn-3d mr-4">
                  Book Consultation
                </Link>
                <Link to="/blog" className="btn btn-outline btn-3d">
                  View All Posts
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

#### Disaster Classification & Severity Assessment
To evaluate the system’s ability to classify disaster types and assess severity, we ran experiments using historical weather data enriched with both structured sensor feeds and unstructured news narratives. The Gemini 1.5 Flash model was tasked with classifying disaster types (e.g., Rainy, Cloudy, Heatwave) and assigning severity levels (Low/Medium/High).

The disaster classifier achieved a Precision of 0.84, Recall of 0.78, F1-Score of 0.79, and Accuracy of 0.78. For severity classification, the model attained a Precision of 0.79, Recall of 0.74, F1-Score of 0.76, and Accuracy of 0.74. Confusion matrices for both tasks reveal strong agreement between predicted and actual labels, especially in high-frequency event classes. These metrics show that the model robustly understands multi-modal context and performs competitively under noisy or overlapping inputs.

#### Simulated Environment
We deployed the system in a simulated environment containing synthetic weather feeds and agent-based disaster propagation logic. The testbed featured dynamic hazards like thunderstorms, sudden floods, and wind-driven infrastructure disruptions.

The orchestration module preserved stability and throughput across all scenarios. It maintained valid disaster-to-action mapping even in noisy simulations, and successfully rerouted alerts and escalation logic when simulated sensor dropout or transmission lag occurred. The visual outputs such as temperature RMSE (3.36°C) and wind RMSE (2.70 km/h) demonstrate the model's capacity to approximate real-world physical systems with tight variance bounds.

####  Response Time & Accuracy
Our end-to-end system responded within 72 seconds on average, significantly outperforming traditional rule-based baselines which averaged over 6 minutes. This represents a 5× improvement in responsiveness.

Importantly, this reduction in latency did not come at the cost of performance: disaster type and severity assessments remained aligned with human consensus at over 91% agreement. This validates the system’s reliability under real-time pressure, and supports the integration of LLM planning into operational disaster pipelines.

#### Social Media Integration & Validation
We evaluated the benefit of real-time social signals by comparing system performance with and without access to social media feeds. The LLM leveraged NewsAPI (news content) to refine classifications and infer urgency in rapidly evolving events.

Incorporating these signals boosted early detection rates, particularly for fast-moving, underreported events such as thunderstorms and flash floods. The model successfully filtered out irrelevant or misleading noise and exhibited semantic grounding that traditional NLP pipelines often lack. The confusion matrix further confirms that adding unstructured data helped reduce misclassifications in ambiguous conditions.

#### Impact of Human Approval
In our ablation study, disabling the human-in-the-loop (HITL) verification layer marginally reduced latency but introduced significant risk. Specifically, false-positive rates rose sharply, particularly in severity edge cases and news-driven anomalies.

By retaining human validators, the system corrected 8.5% of model-generated decisions, avoiding unnecessary alerts and preserving institutional trust. These findings reaffirm the need for hybrid systems where machine intelligence accelerates decisions but final judgment is tempered by human oversight.
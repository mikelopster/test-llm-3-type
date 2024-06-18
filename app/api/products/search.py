from vertexai.preview import rag
from vertexai.preview.generative_models import GenerativeModel, Tool
import vertexai
import sys

# Create a RAG Corpus, Import Files, and Generate a response
project_id = "apppi-gitlab"
display_name = "test_corpus"
paths = ["https://drive.google.com/file/d/1BZsU-Mtaum8GEz5j3hadmAZT2Ozd8nOk/view?usp=sharing"]
search_term = sys.argv[1]

# Initialize Vertex AI API once per session
print("== Setup Vertex")
vertexai.init(project=project_id, location="us-central1")

# Create RagCorpus
print("== Setup RAG")
rag_corpus = rag.create_corpus(display_name=display_name)
print(rag_corpus)

# Import Files to the RagCorpus
print("== Import File")
response = rag.import_files(
    rag_corpus.name,
    paths,
    chunk_size=512,  # Optional
    chunk_overlap=100,  # Optional
)

# Direct context retrieval
print("== Setup Vertex")
response = rag.retrieval_query(
    rag_resources=[
        rag.RagResource(
            rag_corpus=rag_corpus.name,
        )
    ],
    text=search_term,
    similarity_top_k=10,  # Optional
    vector_distance_threshold=0.5,  # Optional
)
print("== Response")
print(response)

# Enhance generation
# Create a RAG retrieval tool
rag_retrieval_tool = Tool.from_retrieval(
    retrieval=rag.Retrieval(
        source=rag.VertexRagStore(
            rag_resources=[
                rag.RagResource(
                    rag_corpus=rag_corpus.name
                )
            ],
            similarity_top_k=3,  # Optional
            vector_distance_threshold=0.5,  # Optional
        ),
    )
)
# Create a gemini-pro model instance
rag_model = GenerativeModel(
    model_name="gemini-1.0-pro-002", tools=[rag_retrieval_tool]
)

# Modify the prompt template


def create_prompt(search_term):
    example_input_array = [
        {"id": 1, "name": "Product A", "price": 29.99, "image": "...", "link": "https://nextjs.org/docs/app/building-your-application/routing/route-handlers",
            "description": "A high-quality product designed for everyday use."},
        {"id": 2, "name": "Product B", "price": 45.5, "image": "...",
            "description": "Experience the premium quality of Product B."}
    ]

    example_output_array = [
        {"id": 1, "name": "Product A", "price": 29.99, "image": "...", "link": "https://nextjs.org/docs/app/building-your-application/routing/route-handlers",
            "description": "A high-quality product designed for everyday use."},
    ]

    return f"""You are a helpful assistant that can generate a JSON object based on a user's query. 

**Query:**
{search_term}

Example Input JSON:
{example_input_array}

Valid JSON output:
{example_output_array}
"""


# Generate response
prompt = create_prompt(search_term)
print(prompt)
response = rag_model.generate_content(prompt)
print("== End Result")
print(response.text)

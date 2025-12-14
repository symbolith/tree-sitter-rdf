import io.github.treesitter.jtreesitter.Language;
import io.github.treesitter.jtreesitter.rdf12trig.TreeSitterRdf12Trig;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class TreeSitterRdf12TrigTest {
    @Test
    public void testCanLoadLanguage() {
        assertDoesNotThrow(() -> new Language(TreeSitterRdf12Trig.language()));
    }
}
